import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import eyeson, { StreamHelpers } from 'eyeson';

import { StorageService } from '../shared/services/storage.service';
import { VideoService } from './video.service';
import { store } from '../shared/store/store';
import { updateRoom } from '../shared/store/actions';
import { Room } from '../shared/model/room';
import { User } from '../shared/model/user';

declare global {
  interface Window {
    stream: any;
  }
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [VideoService],
})
export class VideoComponent implements OnInit, OnDestroy {
  accessKey: string = '';
  roomId: string = '';
  videoSrc: any;
  screen: boolean = false;
  local: any = {};
  stream: any = null;
  audio: boolean = true;
  video: boolean = true;
  type: string = '';
  showCanvas: boolean = false;
  room: Room = Room.EMPTY_ROOM;
  user: User = User.EMPTY_USER;
  controls: any = [
    {
      icon: 'microphone',
      toggleIcon: 'microphone-slash',
      title: 'Mic',
      action: 'toggleAudio',
      handled: false,
    },
    {
      icon: 'video',
      title: 'Video',
      toggleIcon: 'video-slash',
      action: 'toggleVideo',
      handled: false,
    },
    {
      icon: 'user-plus',
      title: 'Add user',
      action: 'handleInvite',
      handled: false,
    },
    {
      icon: 'times-circle',
      title: 'Leave',
      action: 'handleLeaveRoom',
      handled: false,
    },
    {
      icon: 'times-circle',
      title: 'Stop',
      action: 'handleStopMeeting',
      handled: false,
    },
  ];

  @ViewChild('videoRef') videoRef: any = null;

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private router: Router
  ) {
    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId')!;
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!;
    store.subscribe(() => {
      this.room = store.getState().room;
      this.user = store.getState().user;
    });
  }

  ngOnDestroy(): void {
    this.endStream();
  }

  ngOnInit(): void {
    if (this.type === 'continue') {
      this.endStream();
      this.startStream();
    } else {
      this.startRoom();
    }
  }

  handleControls(action: Exclude<keyof VideoComponent, 'handleControls'>) {
    this[action]();
  }

  joinMeeting(): Promise<boolean> {
    return new Promise((resolve) => {
      this.videoService
        .post(`rooms/${this.roomId}`, {})
        .subscribe(({ data }) => {
          store.dispatch(updateRoom(data.room));
          this.room.setAccessKey(data.access_key);
          resolve(data);
        });
    });
  }

  async checkIfJoined(access_key: string) {
    return new Promise((resolve) => {
      this.videoService.get(`rooms/${access_key}`).subscribe({
        next: (data) => { resolve(data); },
        error: (error) => { resolve(null); }
      });
    })
  }

  async startRoom() {
    const accessKeys = this.storageService.getItem('access_key') || {};
    let joined = false;

    if (accessKeys[this.roomId]) {
      const joinedAlready = await this.checkIfJoined(accessKeys[this.roomId]);
      if (joinedAlready) {
        joined = true;
      } else {
        this.endStream();
        joined = await this.joinMeeting();
      }
    } else {
      joined = await this.joinMeeting();
    }

    if (joined) {
      accessKeys[this.roomId] = this.room.getAccessKey();
      this.storageService.setItem('access_key', accessKeys);
      this.startStream();
    }
  }

  endStream() {
    eyeson.destroy(); // destroy and cleanup a session
    eyeson.offEvent(this.handleEvent.bind(this));
  }

  startStream() {
    this.accessKey = this.storageService.getItem('access_key')[this.roomId];

    eyeson.start(this.accessKey);
    eyeson.onEvent(this.handleEvent.bind(this));
  }

  async handleStopMeeting() {
    const stopped = await this.videoService.post(
      `rooms/${this.roomId}/stop`,
      {}
    );

    if (stopped) {
      this.handleLeaveRoom();
    }
  }

  async handleLeaveRoom() {
    if (Object.keys(this.user).length) {
      this.router.navigateByUrl('dashboard');
    } else {
      this.router.navigateByUrl('login');
    }
    this.stopAudio();
  }

  stopAudio() {
    if (window.stream) {
      window.stream.getTracks().forEach((track: any) => {
        track.stop();
      });
    }
  }

  toggleAudio() {
    const audioEnabled = !this.audio;
    if (audioEnabled) {
      StreamHelpers.enableAudio(this.local);
    } else {
      StreamHelpers.disableAudio(this.local);
    }
    this.audio = audioEnabled;
  }

  toggleVideo() {
    eyeson.send({
      type: 'change_stream',
      stream: this.local,
      video: !this.video,
      audio: this.audio,
    });
    this.video = !this.video;
  }

  toggleScreen() {
    if (!this.screen) {
      try {
        eyeson.send({
          type: 'start_screen_capture',
          audio: this.audio,
          screenStream: null,
          screen: true,
        });
        this.screen = true;
      } catch (err) {
        console.log({ err });
      }
    } else {
      eyeson.send({ type: 'stop_presenting' });
      this.screen = false;
    }
  }

  toggleFullscreen() {
    this.videoSrc = this.videoRef;
    this.videoSrc.requestFullscreen();
  }

  handleEvent(event: any) {
    if (event.type === 'presentation_ended') {
      eyeson.send({
        type: 'start_stream',
        audio: true,
        video: true,
      });

      this.screen = false;
      return;
    }

    if (event.type === 'add_user') {
      // this.addUser(event.user);
    }

    if (event.type === 'exit') {
      this.handleExit();
    }

    if (event.type !== 'accept') {
      console.debug('[Home]', 'Ignore received event:', event.type);
      return;
    }

    if (event.type !== 'stream_update') {
      this.local = event.localStream;
      this.stream = event.remoteStream;
      this.videoSrc = this.videoRef.nativeElement;
      this.videoSrc.srcObject = event.remoteStream;
      this.videoSrc.play();
    }
  }

  isStreamEmpty() {
    return this.stream === null;
  }

  handleExit() {
    this.router.navigateByUrl('dashboard');
    document.location.reload();
  }
}

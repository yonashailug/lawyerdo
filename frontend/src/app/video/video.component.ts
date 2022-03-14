import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import eyeson, { StreamHelpers } from 'eyeson';

import { StorageService } from '../shared/services/storage.service'
import { VideoService } from './video.service';
import { store } from '../shared/store/store'
import { updateRoom } from '../shared/store/actions';
import { Room } from '../shared/model/room';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],
  providers: [VideoService]
})
export class VideoComponent implements OnInit, OnDestroy {

  accessKey: string = ''
  roomId: string = ''
  videoSrc: any
  screen: boolean = false
  local: any = null
  stream: any = null
  audio: boolean = true
  video: boolean = true
  type: string = ''
  showCanvas: boolean = false
  room: Room = Room.EMPTY_ROOM
  subscriptions: any = []

  @ViewChild('videoRef') videoRef: any = null;

  constructor(private storageService: StorageService,
     private activatedRoute: ActivatedRoute,
     private videoService: VideoService,
     private router: Router) {

    this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId')!
    this.type = this.activatedRoute.snapshot.paramMap.get('type')!

    this.subscriptions[0] = store.subscribe(() => { this.room = store.getState().room })

    console.log(this.roomId)
    console.log(this.type)

  }

  ngOnDestroy(): void {
    this.endStream()
  }

  ngOnInit(): void {

    if (this.type === 'continue') {
      this.endStream();
      this.startStream();
    } else {
      this.startRoom();
      //TODO: Delete me
      this.startStream();
    }
  }

  joinMeeting(): Promise<boolean> {

    //mutation: 'setRoom',
    return new Promise((resolve) => {
      this.videoService.post(`rooms/${this.roomId}`, {})
      .subscribe(({ data }) => {

        store.dispatch(updateRoom(data.room))

        // this.room = {...data.room }
        this.room.setAccessKey(data.access_key)
        // this.room['access_key'] = data.access_key
        console.log(this.room)
        resolve(data)
      })
    })
  }

  async checkIfJoined(access_key: string) {
    // Update state
    return new Promise(resolve => {
      this.videoService.get(`rooms/${access_key}`)
      .subscribe((data: any) => {
        console.log(data)
        resolve(data)
      })
    })
  }

  async startRoom() {

    const accessKeys = this.storageService.getItem('access_key') || {};
    let joined = false;

    if (accessKeys[this.roomId]) {
      let joinedAlready = await this.checkIfJoined(accessKeys[this.roomId]);
      if (joinedAlready) {
        //if it is not expired
        joined = true;
      } else {
        //if expired
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
    eyeson.offEvent(this.handleEvent);
  }

  startStream() {

    this.accessKey = this.storageService.getItem('access_key')[this.roomId]

    eyeson.start(this.accessKey)
    eyeson.onEvent(this.handleEvent)


    // ModalBus.$on('toggleAudio', ({ action }) => {
    //   if (action === 'toggleAudio') {
    //     this.toggleAudio();
    //   } else if (action === 'toggleVideo') {
    //     this.toggleVideo();
    //   } else if (action === 'toggleScreen') {
    //     this.toggleScreen();
    //   } else if (action === 'toggleFullscreen') {
    //     this.toggleFullscreen();
    //   } else if (action === 'handleLayoutChange') {
    //     this.handleLayoutChange();
    //   } else if (action === 'toggleRecord') {
    //     this.toggleRecord();
    //   }
    // })

  }

  toggleAudio() {
    const audioEnabled = !this.audio;
    if (audioEnabled) {
      StreamHelpers.enableAudio(this.local);
    } else {
      StreamHelpers.disableAudio(this.local);
    }
    // eventBus.$emit('toggleAction', {
    //   action: 'toggleAudio',
    //   handled: !audioEnabled
    // });
    this.audio = audioEnabled;
  }

  toggleVideo() {
    eyeson.send({
      type: 'change_stream',
      stream: this.local,
      video: !this.video,
      audio: this.audio
    });
    this.video = !this.video;

    // eventBus.$emit('toggleAction', {
    //   action: 'toggleVideo',
    //   handled: !this.video
    // });
  }

  toggleScreen() {
    if (!this.screen) {
      try {
        eyeson.send({
          type: 'start_screen_capture',
          audio: this.audio,
          screenStream: null,
          screen: true
        });
        this.screen = true;
      } catch (err) {
        console.log({ err });
      }
    } else {
      eyeson.send({ type: 'stop_presenting' });
      this.screen = false;
    }
    // eventBus.$emit('toggleAction', {
    //   action: 'toggleScreen',
    //   handled: this.screen
    // });
  }

  toggleFullscreen() {
    this.videoSrc = this.videoRef;
    this.videoSrc.requestFullscreen();
  }

  handleEvent(event: any) {
    // console.log('Event::', event);
    if (event.type === 'presentation_ended') {
      eyeson.send({
        type: 'start_stream',
        audio: true,
        video: true
      });

      this.screen = false;
      // eventBus.$emit('toggleAction', {
      //   action: 'toggleScreen',
      //   handled: this.screen
      // });

      return;
    }

    if (event.type === 'add_user') {
      // this.addUser(event.user);
    }

    if (event.type === 'exit') {
      this.handleExit()
    }

    if (event.type !== 'accept') {
      console.debug('[Home]', 'Ignore received event:', event.type);
      return;
    }

    if (event.type !== 'stream_update') {
      this.local = event.localStream;
      this.stream = event.remoteStream;

      console.log(this.videoRef)
      this.videoSrc = this.videoRef.nativeElement
      console.log('stream_update');
      // console.log('videoSrc: ', this.videoSrc);
      this.videoSrc.srcObject = event.remoteStream;
      this.videoSrc.play();
    }
  }

  handleExit() {
    this.router.navigateByUrl('rooms');
    document.location.reload();
  }
}

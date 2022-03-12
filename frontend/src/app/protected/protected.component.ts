import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseModel } from '../course/course.model';
import { ProtectedService } from './protected.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
  providers: [ProtectedService]
})
export class ProtectedComponent implements OnInit, OnDestroy {

  courses: CourseModel[] = []
  subscriptions: Subscription[] = []
  constructor(private protectedService: ProtectedService) { }

  ngOnInit(): void {
    this.subscriptions[0] = this.protectedService.getCourses().subscribe(({ data }: any) => { this.courses = <CourseModel[]> data })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }
}

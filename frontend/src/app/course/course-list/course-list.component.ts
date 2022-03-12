import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseModel } from '../course.model';
import { CourseListService } from './course-list.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [CourseListService]
})
export class CourseListComponent implements OnInit, OnDestroy {

  courses: CourseModel[] = []
  subscriptions: Subscription[] = []

  constructor(private courseService: CourseListService) { }

  ngOnInit(): void {
    this.subscriptions[0] = this.courseService.getCourse().subscribe(({ data }: any) => { this.courses = <CourseModel[]> data })
  }

  deleteCourse(id: string) {
    this.subscriptions[1] = this.courseService.deleteCourse(id).subscribe()
    this.courses = this.courses.filter((course: CourseModel) => course._id !== id)
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { CourseComponent } from './course.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent,
    children: [
      {
        path: '',
        component: CourseListComponent    
      }
    ]
  }
]

@NgModule({
  declarations: [
    CourseComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
})
export class CourseModule { }

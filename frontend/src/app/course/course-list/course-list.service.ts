import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseListService implements HttpInterceptor {

  constructor(private client: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }

  getCourse(): Observable<Object | CourseModel[]> {
    return this.client.get('http://localhost:3000/api/courses')
  }

  deleteCourse(id: string): Observable<Object> {
    return this.client.delete('http://localhost:3000/api/courses/' + id)
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Course, Author } from "../models";
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = 'http://localhost:4000'; 

  constructor(rivate http:HttpClient, private SessionStorageService:SessionStorageService) {}

getAll(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/courses/all`).pipe(
            catchError(this.handleError)
          );
    }
 
    createCourse(course: Course): Observable<Course> { 
      const token = this.SessionStorageService.getToken(); 
        const headers = new HttpHeaders({
        'Authorization': `${token}` 
      });
        return this.http.post<Course>(`${this.apiUrl}/courses/add`,course,{headers}).pipe(
            catchError(this.handleError)
          );
    }
 
    editCourse(id: string, course: Course):Observable<Course> { 
        return this.http.put<Course>(`${this.apiUrl}/courses/${id}`,course).pipe(
            catchError(this.handleError)
          );
    }
 
    getCourse(id: string):Observable<CourseResponse> {
      const token = this.SessionStorageService.getToken(); 
        const headers = new HttpHeaders({
        'Authorization': `${token}`
      });
        return this.http.get<CourseResponse>(`${this.apiUrl}/courses/${id}`,{headers}).pipe(
            catchError(this.handleError)
          );
    }
 
    deleteCourse(id: string):Observable<Course> {
        return this.http.delete<Course>(`${this.apiUrl}/courses/${id}`).pipe(
            catchError(this.handleError)
          );
    }
 
 
    filterCourses(value: string): Observable<CourseResponse> {
        let params = new HttpParams();
 
        if (value) {
          params = params.set('title', value);
        }
 
        return this.http.get<CourseResponse>(`${this.apiUrl}/courses/filter`, { params });
      }
 
    getAllAuthors():Observable<Authors> {
        return this.http.get<Authors>(`${this.apiUrl}/authors/all`).pipe(
            catchError(this.handleError)
          );
    }
 
    createAuthor(name: string):Observable<AuthorResponse> {
      const token = this.SessionStorageService.getToken();
      const headers = new HttpHeaders({
      'Authorization': `${token}`
    });
 
        return this.http.post<AuthorResponse>(`${this.apiUrl}/authors/add`,{'name':name},{headers}).pipe(
            catchError(this.handleError)
          );
    }
 
    getAuthorById(id: string):Observable<Author> {
            return this.http.get<Author>(`${this.apiUrl}/authors/${id}`).pipe(
                catchError(this.handleError)
              );
 
    }
 
 
 
     handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = '';
 
        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server-side error: ${error.status} - ${error.message}`;
        }
 
        console.error(errorMessage);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      }
 
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${environment.apiBaseUrl}/authors/${id}`);
  }
}

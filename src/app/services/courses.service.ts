import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Course, Author } from "../models"; // Adjust the import path as needed

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private apiUrl = `${environment.apiBaseUrl}/courses`; // Base URL for the courses API

    constructor(private http: HttpClient) {}

    getAll(): Observable<Course[]> {
        // Use Course[] instead of any[]
        return this.http.get<Course[]>(this.apiUrl);
    }

    createCourse(course: Course): Observable<Course> {
        // Use Course instead of any
        return this.http.post<Course>(this.apiUrl, course);
    }

    editCourse(id: string, course: Course): Observable<Course> {
        // Use Course instead of any
        return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
    }

    getCourse(id: string): Observable<Course> {
        // Use Course instead of any
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    deleteCourse(id: string): Observable<any> {
        // Can keep as any if there's no specific return type
        return this.http.delete<Course>(`${this.apiUrl}/${id}`);
    }

    filterCourses(value: string): Observable<Course[]> {
        // Use Course[] instead of any[]
        return this.http.get<Course[]>(`${this.apiUrl}?search=${value}`);
    }

    getAllAuthors(): Observable<any[]> {
        // Replace 'any[]' with your specific author interface if defined
        return this.http.get<Author[]>(`${environment.apiBaseUrl}/authors`);
    }

    createAuthor(name: string): Observable<any> {
        return this.http.post<Author>(`${environment.apiBaseUrl}/authors`, {
            name,
        });
    }

    getAuthorById(id: string): Observable<any> {
        // Replace 'any' with your specific author interface if defined
        return this.http.get<Author>(`${environment.apiBaseUrl}/authors/${id}`);
    }
}

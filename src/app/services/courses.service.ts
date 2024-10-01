import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Course, Author } from "../models";

@Injectable({
    providedIn: "root",
})
export class CoursesService {
    private apiUrl = "http://localhost:4000";

    constructor(private http: HttpClient) {}

    getAll(): Observable<Course[]> {
        return this.http.get<Course[]>(this.apiUrl);
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(this.apiUrl, course);
    }

    editCourse(id: string, course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/${id}`, course);
    }

    getCourse(id: string): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/${id}`);
    }

    deleteCourse(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`); // Change to `void` since delete typically returns nothing
    }

    filterCourses(value: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${this.apiUrl}?search=${value}`);
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(`${this.apiUrl}/authors`);
    }

    createAuthor(name: string): Observable<Author> {
        return this.http.post<Author>(`${this.apiUrl}/authors`, {
            name,
        });
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
    }
}

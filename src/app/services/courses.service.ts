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
        return this.http.get<Course[]>(`${this.apiUrl}/courses/all`); // Corrected here
    }

    createCourse(course: Course): Observable<Course> {
        return this.http.post<Course>(`${this.apiUrl}/courses/add`, course);
    }

    editCourse(id: string, course: Course): Observable<Course> {
        return this.http.put<Course>(`${this.apiUrl}/courses/${id}`, course); // Corrected here
    }

    getCourse(id: string): Observable<Course> {
        return this.http.get<Course>(`${this.apiUrl}/courses/${id}`); // Corrected here
    }

    deleteCourse(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/courses/${id}`); // Corrected here
    }

    filterCourses(value: string): Observable<Course[]> {
        return this.http.get<Course[]>(
            `${this.apiUrl}/courses/filter?search=${value}`
        );
    }

    getAllAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(`${this.apiUrl}/authors/all`);
    }

    createAuthor(name: string): Observable<Author> {
        return this.http.post<Author>(`${this.apiUrl}/authors/add`, {
            name,
        });
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
    }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators"; // Import the map operator
import { CoursesService } from "./courses.service";
import { Course } from "../models"; // Adjust the import path as needed

@Injectable({
    providedIn: "root",
})
export class CoursesStoreService {
    private courses$$ = new BehaviorSubject<Course[]>([]); // Private BehaviorSubject for courses
    private isLoading$$ = new BehaviorSubject<boolean>(false); // Private BehaviorSubject for loading state

    // Public Observables to expose the BehaviorSubjects
    public courses$ = this.courses$$.asObservable();
    public isLoading$ = this.isLoading$$.asObservable();

    constructor(private coursesService: CoursesService) {}

    getAll(): void {
        this.isLoading$$.next(true); // Set loading to true
        this.coursesService.getAll().subscribe({
            next: (courses) => {
                this.courses$$.next(courses); // Store fetched courses
                this.isLoading$$.next(false); // Set loading to false
            },
            error: (err) => {
                this.isLoading$$.next(false); // Set loading to false
                console.error(err); // Log error
            },
        });
    }

    // Method to filter courses based on a search term and update courses$$
    searchCourses(value: string): void {
        this.coursesService.getAll().subscribe({
            next: (courses) => {
                const filteredCourses = courses.filter(
                    (course) =>
                        course.title
                            .toLowerCase()
                            .includes(value.toLowerCase()) ||
                        course.description
                            .toLowerCase()
                            .includes(value.toLowerCase())
                );
                this.courses$$.next(filteredCourses); // Update the BehaviorSubject with filtered courses
            },
        });
    }

    createCourse(course: Course): void {
        this.isLoading$$.next(true); // Set loading to true
        this.coursesService.createCourse(course).subscribe({
            next: (newCourse) => {
                const currentCourses = this.courses$$.getValue(); // Get current courses
                this.courses$$.next([...currentCourses, newCourse]); // Add new course to local store
                this.isLoading$$.next(false); // Set loading to false
            },
            error: (err) => {
                this.isLoading$$.next(false); // Set loading to false
                console.error(err); // Log error
            },
        });
    }

    editCourse(id: string, course: Course): void {
        this.isLoading$$.next(true); // Set loading to true
        this.coursesService.editCourse(id, course).subscribe({
            next: (updatedCourse) => {
                const currentCourses = this.courses$$.getValue();
                const updatedCourses = currentCourses.map((c) =>
                    c.id === id ? updatedCourse : c
                ); // Update course in local store
                this.courses$$.next(updatedCourses); // Update the BehaviorSubject
                this.isLoading$$.next(false); // Set loading to false
            },
            error: (err) => {
                this.isLoading$$.next(false); // Set loading to false
                console.error(err); // Log error
            },
        });
    }

    getCourse(id: string): Course | undefined {
        return this.courses$$.getValue().find((course) => course.id === id); // Retrieve course from local store
    }

    deleteCourse(id: string): void {
        this.isLoading$$.next(true); // Set loading to true
        this.coursesService.deleteCourse(id).subscribe({
            next: () => {
                const currentCourses = this.courses$$.getValue();
                this.courses$$.next(
                    currentCourses.filter((course) => course.id !== id)
                ); // Remove course from local store
                this.isLoading$$.next(false); // Set loading to false
            },
            error: (err) => {
                this.isLoading$$.next(false); // Set loading to false
                console.error(err); // Log error
            },
        });
    }

    filterCourses(value: string): Observable<Course[]> {
        return this.courses$.pipe(
            map((courses) =>
                courses.filter(
                    (course) =>
                        course.title.includes(value) ||
                        course.description.includes(value)
                )
            )
        ); // Emit filtered courses
    }

    getAllAuthors(): Observable<any[]> {
        return this.coursesService.getAllAuthors(); // Directly use the courses service method
    }

    createAuthor(name: string): Observable<any> {
        return this.coursesService.createAuthor(name); // Directly use the courses service method
    }

    getAuthorById(id: string): Observable<any> {
        return this.coursesService.getAuthorById(id); // Directly use the courses service method
    }
}

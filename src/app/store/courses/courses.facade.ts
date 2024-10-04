import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import * as CoursesSelectors from "./courses.selectors";
import * as CoursesActions from "./courses.actions";
import { Course } from "@app/models"; // Adjust the path to your Course model

@Injectable({
    providedIn: "root",
})
export class CoursesStateFacade {
    // 5.1 Public observable properties
    public isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isAllCoursesLoadingSelector)
    );
    public isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isSingleCourseLoadingSelector)
    );
    public isSearchingState$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isSearchingStateSelector)
    );
    public courses$: Observable<Course[]> = this.store.pipe(
        select(CoursesSelectors.getCourses)
    );
    public allCourses$: Observable<Course[]> = this.store.pipe(
        select(CoursesSelectors.getAllCourses)
    );
    public course$: Observable<Course | null> = this.store.pipe(
        select(CoursesSelectors.getCourse)
    );
    public errorMessage$: Observable<string | null> = this.store.pipe(
        select(CoursesSelectors.getErrorMessage)
    );

    constructor(private store: Store) {}

    // 5.2 Methods to dispatch actions

    // Dispatches requestAllCourses action
    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    // Dispatches requestSingleCourse action
    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    // Dispatches requestFilteredCourses action
    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(
            CoursesActions.requestFilteredCourses({ title: searchValue })
        );
    }

    // Dispatches requestEditCourse action
    editCourse(course: Course, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ course, id }));
    }

    // Dispatches requestCreateCourse action
    createCourse(body: Partial<Course>): void {
        const courseWithDefaults: Course = {
            id: body.id || "", // default empty string or generate one if needed
            title: body.title || "Untitled Course", // default title
            description: body.description || "No description available",
            creationDate: body.creationDate
                ? new Date(body.creationDate)
                : new Date(), // current date if not provided
            duration: body.duration || 0, // default duration
            authors: body.authors || [], // default empty authors array
        };
        this.store.dispatch(
            CoursesActions.requestCreateCourse({ course: courseWithDefaults })
        );
    }

    // Dispatches requestDeleteCourse action
    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }
}

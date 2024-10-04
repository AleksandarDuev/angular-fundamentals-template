import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, withLatestFrom, tap } from "rxjs/operators";
import { of } from "rxjs";
import { CoursesService } from "../../services/courses.service";
import * as CoursesActions from "./courses.actions";
import { Router } from "@angular/router";
import { CoursesStateFacade } from "./courses.facade";

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private coursesStateFacade: CoursesStateFacade,
        private router: Router
    ) {}

    // 4.1 getAll$ effect
    getAll$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestAllCourses),
            mergeMap(() =>
                this.coursesService.getAll().pipe(
                    map((courses) =>
                        CoursesActions.requestAllCoursesSuccess({ courses })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestAllCoursesFail({ error }))
                    )
                )
            )
        )
    );

    // 4.2 filteredCourses$ effect
    filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestFilteredCourses),
            withLatestFrom(this.coursesStateFacade.allCourses$), // Get all courses from facade
            mergeMap(([{ title }, allCourses]) => {
                const filteredCourses = allCourses.filter((course) =>
                    course.title.includes(title)
                );
                return of(
                    CoursesActions.requestFilteredCoursesSuccess({
                        courses: filteredCourses,
                    })
                );
            }),
            catchError((error) =>
                of(CoursesActions.requestFilteredCoursesFail({ error }))
            )
        )
    );

    // 4.3 getSpecificCourse$ effect
    getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestSingleCourse),
            mergeMap(({ id }) =>
                this.coursesService.getCourse(id).pipe(
                    map((course) =>
                        CoursesActions.requestSingleCourseSuccess({ course })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestSingleCourseFail({ error }))
                    )
                )
            )
        )
    );

    // 4.4 deleteCourse$ effect
    deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestDeleteCourse),
            mergeMap(({ id }) =>
                this.coursesService.deleteCourse(id).pipe(
                    map(() => CoursesActions.requestAllCourses()), // Trigger a refresh of all courses
                    catchError((error) =>
                        of(CoursesActions.requestDeleteCourseFail({ error }))
                    )
                )
            )
        )
    );

    // 4.5 editCourse$ effect
    editCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestEditCourse),
            mergeMap(({ id, course }) =>
                this.coursesService.editCourse(id, course).pipe(
                    map((updatedCourse) =>
                        CoursesActions.requestEditCourseSuccess({
                            course: updatedCourse,
                        })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestEditCourseFail({ error }))
                    )
                )
            )
        )
    );

    // 4.6 createCourse$ effect
    createCourse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CoursesActions.requestCreateCourse),
            mergeMap(({ course }) =>
                this.coursesService.createCourse(course).pipe(
                    map((createdCourse) =>
                        CoursesActions.requestCreateCourseSuccess({
                            course: createdCourse,
                        })
                    ),
                    catchError((error) =>
                        of(CoursesActions.requestCreateCourseFail({ error }))
                    )
                )
            )
        )
    );

    // 4.7 redirectToTheCoursesPage$ effect
    redirectToTheCoursesPage$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(
                    CoursesActions.requestCreateCourseSuccess,
                    CoursesActions.requestEditCourseSuccess,
                    CoursesActions.requestSingleCourseFail
                ),
                tap(() => this.router.navigate(["/courses"]))
            ),
        { dispatch: false } // Disable dispatch because this effect only performs navigation
    );
}

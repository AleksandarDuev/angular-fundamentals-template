import { Action, createReducer, on } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import { Course } from "@app/models";

// 2.1 Export the feature key
export const coursesFeatureKey = "courses";

// 2.2 Create the `CoursesState` interface
export interface CoursesState {
    allCourses: Course[]; // List of all courses
    course: Course | null; // Single course details
    isAllCoursesLoading: boolean; // Loading state for all courses
    isSingleCourseLoading: boolean; // Loading state for a single course
    isSearchState: boolean; // Search mode state
    errorMessage: string | null; // Error message for any failed operation
}

// 2.3 Create `initialState` for the reducer
export const initialState: CoursesState = {
    allCourses: [],
    course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

// 2.4 Implement the reducer functionality
export const coursesReducer = createReducer(
    initialState,

    // Request All Courses
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
    })),
    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // Request Single Course
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    // Request Filtered Courses
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        isSearchState: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        allCourses: courses,
        isAllCoursesLoading: false,
        isSearchState: false,
    })),
    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        isSearchState: false,
        errorMessage: error,
    })),

    // Delete Course
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
    })),
    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // Edit Course
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        course,
        isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    })),

    // Create Course
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        errorMessage: null,
    })),
    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        allCourses: [...state.allCourses, course],
        isSingleCourseLoading: false,
    })),
    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        errorMessage: error,
    }))
);

// Export the reducer function
export const reducer = (
    state: CoursesState | undefined,
    action: Action
): CoursesState => {
    return coursesReducer(state, action);
};

import { createSelector, createFeatureSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";

// Select the feature state (courses)
export const selectCoursesFeature =
    createFeatureSelector<CoursesState>(coursesFeatureKey);

// Select allCourses array from the state
export const getAllCourses = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.allCourses
);

// Add this new selector for allCourses$
export const getCourses = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.allCourses // or any logic you prefer for selecting all courses
);

// Other selectors...
export const getCourse = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.course
);

export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.isAllCoursesLoading
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.isSingleCourseLoading
);

export const isSearchingStateSelector = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.isSearchState
);

export const getErrorMessage = createSelector(
    selectCoursesFeature,
    (state: CoursesState) => state.errorMessage
);

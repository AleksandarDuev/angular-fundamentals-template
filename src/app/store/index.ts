import { ActionReducerMap } from "@ngrx/store";
import { CoursesState, coursesReducer } from "./courses/courses.reducer";
import { CoursesEffects } from "./courses/courses.effects";

// Define the main state interface
export interface State {
    courses: CoursesState; // Reference to CoursesState defined in the courses reducer
}

// Define the reducers
export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer, // Reference to the coursesReducer
};

// Export the effects
export const effects = [
    CoursesEffects, // Reference to the CoursesEffects
];

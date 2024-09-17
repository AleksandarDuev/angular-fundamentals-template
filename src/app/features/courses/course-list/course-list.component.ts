import { Component, Input, Output, EventEmitter } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-course-list",
    templateUrl: "./course-list.component.html",
    styleUrls: ["./course-list.component.css"],
})
export class CourseListComponent {
    // Input properties for the list of courses and the editable flag
    @Input() courses: {
        title: string;
        description: string;
        creationDate: Date;
        duration: number;
        authors: string[];
    }[] = [];
    @Input() editable: boolean = false;

    // Output events for delegating actions to the parent component
    @Output() showCourse = new EventEmitter<number>();
    @Output() editCourse = new EventEmitter<number>();
    @Output() deleteCourse = new EventEmitter<number>();

    // Function to emit the show course event
    onShowCourse(index: number) {
        this.showCourse.emit(index);
    }

    // Function to emit the edit course event
    onEditCourse(index: number) {
        this.editCourse.emit(index);
    }

    // Function to emit the delete course event
    onDeleteCourse(index: number) {
        this.deleteCourse.emit(index);
    }

    faTrashCan = faTrashCan;
    faPencil = faPencil;
}

import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "app-course-card",
    templateUrl: "./course-card.component.html",
    styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
    // Input properties for course data
    @Input() title!: string;
    @Input() description!: string;
    @Input() creationDate!: Date;
    @Input() duration!: number;
    @Input() authors!: string[];

    // Input to determine if the course is editable
    @Input() editable: boolean = true;

    // Output event for show course action
    @Output() clickOnShow = new EventEmitter<void>();

    // Function to emit 'show course' event
    onShowCourse() {
        this.clickOnShow.emit();
    }
}

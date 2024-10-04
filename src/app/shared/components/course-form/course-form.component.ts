import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "../../../services/courses.service"; // Adjust the import path as necessary
import { Course } from "../../../models"; // Adjust the import path for your Course model

@Component({
    selector: "app-add-course",
    templateUrl: "./course-form.component.html",
    styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
    course: Course = {
        title: "",
        description: "",
        creationDate: new Date(),
        duration: 0,
        authors: [],
        id: "", // This will be generated on creation
    };

    constructor(
        private coursesService: CoursesService,
        private router: Router
    ) {}

    addCourse() {
        this.coursesService.createCourse(this.course).subscribe(() => {
            this.router.navigate(["/courses"]); // Redirect to courses page after adding
        });
    }
}

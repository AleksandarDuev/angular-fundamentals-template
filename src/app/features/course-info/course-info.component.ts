import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "../../services/courses.service"; // Adjust the import path
import { UserStoreService } from "../../user/services/user-store.service"; // Adjust the import path
import { Course } from "../../models"; // Adjust the import path for your Course model

@Component({
    selector: "app-course-info",
    templateUrl: "./course-info.component.html",
    styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
    course: Course | undefined;
    isAdmin: boolean = false;

    constructor(
        private coursesService: CoursesService,
        private route: ActivatedRoute,
        private router: Router,
        private userStore: UserStoreService // To check if user is admin
    ) {}

    public navigateToCourses(): void {
        this.router.navigate(["/courses"]);
    }

    ngOnInit(): void {
        this.isAdmin = this.userStore.isAdmin; // Check if the user is admin
        const courseId = this.route.snapshot.paramMap.get("id"); // Get course ID from the route
        if (courseId) {
            this.loadCourse(courseId); // Load course data
        }
    }

    loadCourse(id: string) {
        this.coursesService.getCourse(id).subscribe((data) => {
            this.course = data; // Populate course with data from service
        });
    }

    editCourse() {
        if (this.course) {
            this.router.navigate(["/courses/edit", this.course.id]); // Navigate to edit course page
        }
    }
}

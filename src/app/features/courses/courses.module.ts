import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesComponent } from "./courses.component";
import { CourseListComponent } from "./course-list/course-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const components = [CourseListComponent];

@NgModule({
    declarations: [CoursesComponent, components, CoursesComponent],
    imports: [CommonModule, SharedModule, FontAwesomeModule],
    exports: [components],
})
export class CoursesModule {}


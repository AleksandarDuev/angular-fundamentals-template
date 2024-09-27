import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "./user/guards/admin.guard";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

const routes: Routes = [
    {
        path: "login",
        loadComponent: () =>
            import("./shared/components/login-form/login-form.component").then(
                (m) => m.LoginFormComponent
            ),
        canActivate: [NotAuthorizedGuard],
    },
    {
        path: "registration",
        loadComponent: () =>
            import(
                "./shared/components/registration-form/registration-form.component"
            ).then((m) => m.RegistrationFormComponent),
        canActivate: [NotAuthorizedGuard],
    },
    {
        path: "courses",
        loadComponent: () =>
            import("./features/courses/course-list/course-list.component").then(
                (m) => m.CourseListComponent
            ),
        canLoad: [AuthorizedGuard],
    },
    {
        path: "courses/add",
        loadComponent: () =>
            import(
                "./shared/components/course-form/course-form.component"
            ).then((m) => m.CourseFormComponent),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard],
    },
    {
        path: "courses/:id",
        loadComponent: () =>
            import(
                "./shared/components/course-card/course-card.component"
            ).then((m) => m.CourseCardComponent),
        canLoad: [AuthorizedGuard],
    },
    {
        path: "courses/edit/:id",
        loadComponent: () =>
            import(
                "./shared/components/course-form/course-form.component"
            ).then((m) => m.CourseFormComponent),
        canLoad: [AuthorizedGuard],
        canActivate: [AdminGuard],
    },
    {
        path: "",
        redirectTo: "/courses",
        pathMatch: "full",
    },
    {
        path: "**",
        redirectTo: "/courses",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

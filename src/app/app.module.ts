import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { SharedModule } from "@shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, effects } from "./store/";
import { AppComponent } from "@app/app.component";
import { CourseInfoComponent } from "@features/course-info/course-info.component";
import { NotAuthorizedGuard } from "@app/auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CoursesService } from "@app/services/courses.service";

import { CoursesModule } from "./features/courses/courses.module";

@NgModule({
    declarations: [AppComponent, CourseInfoComponent],
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducers), // Initialize the store with reducers
        EffectsModule.forRoot(effects), // Initialize the store with effects
        SharedModule,
        FontAwesomeModule,
        FormsModule,
        CoursesModule,
    ],
    exports: [],
    providers: [
        AuthorizedGuard,
        NotAuthorizedGuard,
        CoursesService,
        CoursesStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

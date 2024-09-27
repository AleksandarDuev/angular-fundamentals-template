import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserStoreService } from "../services/user-store.service";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class AdminGuard implements CanActivate {
    constructor(
        private userStoreService: UserStoreService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean | UrlTree> {
        return this.userStoreService.isAdmin$.pipe(
            map((isAdmin) => {
                if (isAdmin) {
                    return true; // User is admin, allow access
                } else {
                    // User is not admin, redirect to /courses
                    return this.router.createUrlTree(["/courses"]);
                }
            })
        );
    }
}

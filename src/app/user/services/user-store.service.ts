import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserService } from "./user.service";
import { User } from "../../models"; // Adjust the import path as necessary

@Injectable({
    providedIn: "root",
})
export class UserStoreService {
    private name$$: BehaviorSubject<string | null> = new BehaviorSubject<
        string | null
    >(null);
    private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );

    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {}

    getUser(userId: string): void {
        this.userService.getUser(userId).subscribe({
            next: (user: User) => {
                this.name$$.next(user.name); // Assuming the User model has a 'name' property
                this.isAdmin$$.next(user.isAdmin); // Assuming the User model has an 'isAdmin' property
            },
            error: () => {
                this.name$$.next(null);
                this.isAdmin$$.next(false);
            },
        });
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.value; // Access the BehaviorSubject's current value
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value); // Update the BehaviorSubject's value
    }
}

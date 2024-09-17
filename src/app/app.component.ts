import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent {
    isLoggedIn: boolean = true;

    // Method to toggle login/logout state
    toggleLogin() {
        this.isLoggedIn = !this.isLoggedIn;
    }

    infoHeader: string = "Your List Is Empty";
    infoText: string =
        'Please use "Add New Course" button to add your first course';
}

// src/app/auth/login-form/login-form.component.ts

import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
    @ViewChild("loginForm") public loginForm!: NgForm;
    public isSubmitted: boolean = false;

    /**
     * Handles the form submission.
     * Checks if the form is valid and performs login logic.
     */
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.loginForm.valid) {
            const email = this.loginForm.value.email;
            const password = this.loginForm.value.password;

            // TODO: Implement actual login logic here (e.g., call an authentication service)
            console.log("Login successful!");
            console.log("Email:", email);
            console.log("Password:", password);

            // Optionally, reset the form after successful submission
            this.loginForm.resetForm();
            this.isSubmitted = false;
        } else {
            console.log("Form is invalid");
        }
    }
}

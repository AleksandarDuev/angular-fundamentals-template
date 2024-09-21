// src/app/shared/components/registration-form/registration-form.component.ts

import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { customEmailValidator } from "../../validators/email.validator";
import { Router } from "@angular/router";

@Component({
    selector: "app-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
    registrationForm!: FormGroup;
    isSubmitted: boolean = false;

    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    /**
     * Initializes the registration form with form controls and validators.
     */
    private initializeForm(): void {
        this.registrationForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.required, customEmailValidator()]],
            password: ["", [Validators.required]],
        });
    }

    /**
     * Handles form submission.
     * Checks if the form is valid and performs registration logic.
     */
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.registrationForm.valid) {
            const { name, email, password } = this.registrationForm.value;

            // TODO: Implement actual registration logic here (e.g., call an authentication service)
            console.log("Registration successful!");
            console.log("Name:", name);
            console.log("Email:", email);
            console.log("Password:", password);

            // Optionally, navigate to the login page after successful registration
            this.router.navigate(["/login"]);

            // Reset the form after submission
            this.registrationForm.reset();
            this.isSubmitted = false;
        } else {
            console.log("Form is invalid");
        }
    }

    /**
     * Getter for easy access to form controls in the template.
     */
    get formControls(): { [key: string]: AbstractControl } {
        return this.registrationForm.controls;
    }
}

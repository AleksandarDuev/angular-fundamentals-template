import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: "app-registration-form",
    templateUrl: "./registration-form.component.html",
    styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent implements OnInit {
    registrationForm!: FormGroup;
    isSubmitted = false;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    /**
     * Initializes the registration form with form controls and validators.
     */
    private initializeForm(): void {
        this.registrationForm = this.fb.group({
            name: ["", [Validators.required, Validators.minLength(6)]],
            email: ["", [Validators.required]], 
            password: ["", [Validators.required, Validators.minLength(6)]],
        });
    }

    /**
     * Getter for easy access to form controls in the template.
     */
    get formControls() {
        return this.registrationForm.controls;
    }

    /**
     * Handles form submission.
     */
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.registrationForm.valid) {
            console.log("Form Submitted!", this.registrationForm.value);
            // Handle form submission logic here (e.g., send data to backend)
            // Optionally, reset the form after successful submission
            this.registrationForm.reset();
            this.isSubmitted = false;
        } else {
            console.log("Form is invalid");
            // Optionally, mark all controls as touched to trigger validation messages
            this.registrationForm.markAllAsTouched();
        }
    }
}

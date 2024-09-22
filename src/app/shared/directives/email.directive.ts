import { Directive } from "@angular/core";
import {
    AbstractControl,
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
} from "@angular/forms";

@Directive({
    selector: "[emailValidator]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
})
export class EmailValidatorDirective implements Validator {
    // Regular expression for validating email addresses
    private emailRegex: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;

    /**
     * Validates the email format.
     * @param control The form control to validate.
     * @returns A validation error object if invalid, otherwise null.
     */
    validate(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value;

        if (value && !this.emailRegex.test(value)) {
            return { invalidEmail: true };
        }

        return null;
    }
}

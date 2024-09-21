import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Custom email validator function.
 * Validates the control's value against a regular expression for email.
 */
export function customEmailValidator(): ValidatorFn {
    const emailRegex: RegExp =
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            // If the control is empty, let the required validator handle it
            return null;
        }

        const isValid = emailRegex.test(value);

        return isValid ? null : { invalidEmail: true };
    };
}

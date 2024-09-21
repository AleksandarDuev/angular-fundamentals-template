import { Directive } from "@angular/core";
import {
    NG_VALIDATORS,
    ValidationErrors,
    Validator,
    AbstractControl,
} from "@angular/forms";
import { customEmailValidator } from "@shared/validators/email.validator";

@Directive({
    selector: "[appEmail]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
})
export class EmailValidatorDirective implements Validator {
    private validator = customEmailValidator();

    validate(control: AbstractControl): ValidationErrors | null {
        return this.validator(control);
    }
}

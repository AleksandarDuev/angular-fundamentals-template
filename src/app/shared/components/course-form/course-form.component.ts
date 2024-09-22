import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-course-form",
    templateUrl: "./course-form.component.html",
    styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    submitted = false; // Add this property

    constructor(private fb: FormBuilder, private library: FaIconLibrary) {
        library.addIconPacks(fas);
    }

    ngOnInit() {
        this.courseForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(2)]],
            description: ["", [Validators.required, Validators.minLength(2)]],
            duration: [0, [Validators.required, Validators.min(0)]],
            authors: this.fb.array([]),
            newAuthor: this.fb.group({
                name: [
                    "",
                    [
                        Validators.minLength(2),
                        Validators.pattern(/^[a-zA-Z0-9]*$/),
                    ],
                ],
            }),
        });
    }

    get authors(): FormArray {
        return this.courseForm.get("authors") as FormArray;
    }

    addAuthor() {
        const authorName = this.courseForm.get("newAuthor.name")!.value;
        if (authorName) {
            this.authors.push(this.fb.control(authorName));
            this.courseForm.get("newAuthor.name")!.reset();
        }
    }

    removeAuthor(index: number) {
        this.authors.removeAt(index);
    }

    onSubmit() {
        this.submitted = true; // Set submitted to true on form submission
        if (this.courseForm.valid) {
            console.log(this.courseForm.value);
            // Handle form submission
        }
    }
}

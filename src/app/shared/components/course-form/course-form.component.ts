// src/app/shared/components/course-form/course-form.component.ts

import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormArray,
    Validators,
    AbstractControl,
    ValidatorFn,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-course-form",
    templateUrl: "./course-form.component.html",
    styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
    courseForm!: FormGroup;
    availableAuthors: Array<{ id: number; name: string }> = [];
    courseAuthors: Array<{ id: number; name: string }> = [];
    authorIdCounter: number = 1;
    isSubmitted: boolean = false; // Flag to track form submission

    constructor(public fb: FormBuilder, public library: FaIconLibrary) {
        library.addIconPacks(fas);
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    // Initialize the reactive form
    private initializeForm(): void {
        this.courseForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(2)]],
            description: ["", [Validators.required, Validators.minLength(2)]],
            authors: this.fb.array([]), // FormArray for course authors
            newAuthor: this.fb.group({
                name: [
                    "",
                    [
                        Validators.minLength(2),
                        Validators.pattern("^[a-zA-Z0-9]+$"),
                    ],
                ], // Validate for latin letters and numbers
            }),
            duration: [0, [Validators.required, Validators.min(0)]],
        });

        // Load some default authors for the 'availableAuthors' list
        this.availableAuthors = [
            { id: this.authorIdCounter++, name: "John Doe" },
            { id: this.authorIdCounter++, name: "Jane Smith" },
        ];
    }

    // Getter for easy access to form controls
    get formControls(): { [key: string]: AbstractControl } {
        return this.courseForm.controls;
    }

    // Getter for the authors FormArray
    get authors(): FormArray {
        return this.courseForm.get("authors") as FormArray;
    }

    // Add new author to the available authors list
    addNewAuthor(): void {
        const newAuthorName = this.formControls["newAuthor"]
            .get("name")
            ?.value.trim();
        if (newAuthorName && newAuthorName.length >= 2) {
            // Check if the author already exists
            const existingAuthor = this.availableAuthors.find(
                (author) =>
                    author.name.toLowerCase() === newAuthorName.toLowerCase()
            );

            if (existingAuthor) {
                alert("Author already exists in the available authors list.");
                return;
            }

            const newAuthor = {
                id: this.authorIdCounter++,
                name: newAuthorName,
            };
            this.availableAuthors.push(newAuthor);
            this.formControls["newAuthor"].reset();
        }
    }

    // Add an author to the course authors list
    addAuthorToCourse(author: { id: number; name: string }): void {
        this.authors.push(this.fb.control(author));
        this.availableAuthors = this.availableAuthors.filter(
            (a) => a.id !== author.id
        );
    }

    // Remove an author from the course authors list
    removeAuthorFromCourse(
        author: { id: number; name: string },
        index: number
    ): void {
        this.authors.removeAt(index);
        this.availableAuthors.push(author);
    }

    // Handle form submission
    onSubmit(): void {
        this.isSubmitted = true;

        if (this.courseForm.valid) {
            const { title, description, authors, duration } =
                this.courseForm.value;

            // TODO: Implement actual course creation/editing logic here (e.g., call a backend service)
            console.log("Course created/updated successfully:", {
                title,
                description,
                authors,
                duration,
            });

            // Optionally, reset the form after successful submission
            this.courseForm.reset({
                title: "",
                description: "",
                authors: [],
                newAuthor: { name: "" },
                duration: 0,
            });
            this.isSubmitted = false;
            this.availableAuthors = [
                { id: this.authorIdCounter++, name: "John Doe" },
                { id: this.authorIdCounter++, name: "Jane Smith" },
            ];
            this.authors.clear();
        } else {
            console.log("Form is invalid");
        }
    }
}

import { Component } from "@angular/core";
import {
    FormBuilder,
    FormGroup,
    FormArray,
    Validators,
    AbstractControl,
} from "@angular/forms";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

interface Author {
    id: number;
    name: string;
}

@Component({
    selector: "app-course-form",
    templateUrl: "./course-form.component.html",
    styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
    courseForm: FormGroup;
    submitted: boolean = false;
    availableAuthors: Author[] = [
        { id: 1, name: "Author One" },
        { id: 2, name: "Author Two" },
        { id: 3, name: "Author Three" },
    ];
    courseAuthors: Author[] = [];
    nextAuthorId: number = 4;

    constructor(private fb: FormBuilder, private library: FaIconLibrary) {
        library.addIconPacks(fas);

        // Initialize the form using FormBuilder in the constructor
        this.courseForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(2)]],
            description: ["", [Validators.required, Validators.minLength(2)]],
            duration: [0, [Validators.required, Validators.min(0)]],
            authors: this.fb.array([]), // FormArray for course authors
            newAuthor: this.fb.group({
                name: [
                    "",
                    [
                        Validators.minLength(2),
                        Validators.pattern(/^[a-zA-Z0-9\s]+$/), // Only Latin letters, numbers, and spaces
                    ],
                ],
            }),
        });
    }

    // Getter for authors FormArray
    get authors(): FormArray {
        return this.courseForm.get("authors") as FormArray;
    }

    // Getter for newAuthor FormGroup
    get newAuthor(): FormGroup {
        return this.courseForm.get("newAuthor") as FormGroup;
    }

    // Add an existing author to course authors
    addExistingAuthor(author: Author): void {
        // Remove from available authors
        this.availableAuthors = this.availableAuthors.filter(
            (a) => a.id !== author.id
        );
        // Add to course authors
        this.courseAuthors.push(author);
        // Update the FormArray
        this.authors.push(this.fb.control(author.name));
    }

    // Remove an author from course authors
    removeCourseAuthor(author: Author, index: number): void {
        // Remove from course authors
        this.courseAuthors = this.courseAuthors.filter(
            (a) => a.id !== author.id
        );
        // Add back to available authors
        this.availableAuthors.push(author);
        // Remove from FormArray
        this.authors.removeAt(index);
    }

    // Add a new author
    addNewAuthor(): void {
        if (this.newAuthor.invalid) {
            // Mark the newAuthor control as touched to trigger validation messages
            this.newAuthor.markAllAsTouched();
            return;
        }

        const authorName = this.newAuthor.get("name")?.value.trim();
        if (authorName) {
            const newAuthor: Author = {
                id: this.nextAuthorId++,
                name: authorName,
            };
            // Add to available authors
            this.availableAuthors.push(newAuthor);
            // Reset the newAuthor input
            this.newAuthor.reset();
        }
    }

    // Handle form submission
    onSubmit(): void {
        this.submitted = true;
        if (this.courseForm.valid) {
            const formData = this.courseForm.value;
            const courseData = {
                title: formData.title,
                description: formData.description,
                duration: formData.duration,
                authors: this.courseAuthors,
            };
            console.log("Course Data:", courseData);
            // Here you can handle the form data, e.g., send it to a server
        } else {
            // Mark all controls as touched to trigger validation messages
            this.courseForm.markAllAsTouched();
        }
    }

    // Helper method to check if a control is invalid and should display an error
    isControlInvalid(control: AbstractControl | null): boolean {
        return !!(
            control &&
            control.invalid &&
            (control.touched || this.submitted)
        );
    }
}

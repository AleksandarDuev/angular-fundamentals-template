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
import { v4 as uuidv4 } from "uuid";

interface Author {
    id: string;
    name: string;
}

@Component({
    selector: "app-course-form",
    templateUrl: "./course-form.component.html",
    styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent {
    courseForm!: FormGroup; // Definite assignment assertion
    submitted: boolean = false;

    // Arrays to manage available authors and course authors
    availableAuthors: Author[] = [
        { id: uuidv4(), name: "Author One" },
        { id: uuidv4(), name: "Author Two" },
        { id: uuidv4(), name: "Author Three" },
    ];
    courseAuthorsList: Author[] = [];

    constructor(private fb: FormBuilder, private library: FaIconLibrary) {
        library.addIconPacks(fas);
        this.buildForm();
    }

    buildForm(): void {
        this.courseForm = this.fb.group({
            title: ["", [Validators.required, Validators.minLength(2)]],
            description: ["", [Validators.required, Validators.minLength(2)]],
            duration: ["", [Validators.required, Validators.min(0)]],
            // 'authors' FormArray for available authors
            authors: this.fb.array([]),
            // 'courseAuthors' FormArray for authors added to the course
            courseAuthors: this.fb.array([]),
            // FormGroup for adding a new author
            newAuthor: this.fb.group({
                name: [
                    "",
                    [
                        Validators.minLength(2),
                        Validators.pattern("^[a-zA-Z0-9 ]+$"),
                    ],
                ],
            }),
        });

        // Initialize the available authors FormArray
        this.initializeAvailableAuthors();
    }

    // Initialize the 'authors' FormArray with available authors
    initializeAvailableAuthors(): void {
        this.availableAuthors.forEach((author) => {
            this.authors.push(
                this.fb.group({
                    id: [author.id],
                    name: [author.name],
                })
            );
        });
    }

    // Getter for 'authors' FormArray
    get authors(): FormArray {
        return this.courseForm.get("authors") as FormArray;
    }

    // Getter for 'courseAuthors' FormArray
    get courseAuthors(): FormArray {
        return this.courseForm.get("courseAuthors") as FormArray;
    }

    // Getter for 'newAuthor' FormGroup
    get newAuthor(): FormGroup {
        return this.courseForm.get("newAuthor") as FormGroup;
    }

    // Method to add a new author from the 'newAuthor' FormGroup
    addNewAuthor(): void {
        this.submitted = true;
        const newAuthorName = this.newAuthor.get("name")?.value.trim();
        if (this.newAuthor.valid && newAuthorName) {
            const newAuthor: Author = {
                id: uuidv4(),
                name: newAuthorName,
            };
            // Add to available authors
            this.availableAuthors.push(newAuthor);
            this.authors.push(this.fb.group(newAuthor));
            // Reset the new author input
            this.newAuthor.reset();
        }
        // Mark all controls as touched to show validation errors
        this.newAuthor.markAllAsTouched();
    }

    // Method to add an existing author to course authors
    addExistingAuthor(index: number): void {
        const authorGroup = this.authors.at(index) as FormGroup;
        const author: Author = {
            id: authorGroup.get("id")?.value,
            name: authorGroup.get("name")?.value,
        };

        // Add to course authors
        this.courseAuthors.push(this.fb.group(author));

        // Remove from available authors
        this.authors.removeAt(index);

        // Also remove from availableAuthors array for consistency
        this.availableAuthors = this.availableAuthors.filter(
            (a) => a.id !== author.id
        );
    }

    // Method to remove an author from course authors and add back to available authors
    removeCourseAuthor(index: number): void {
        const courseAuthorGroup = this.courseAuthors.at(index) as FormGroup;
        const author: Author = {
            id: courseAuthorGroup.get("id")?.value,
            name: courseAuthorGroup.get("name")?.value,
        };

        // Remove from course authors
        this.courseAuthors.removeAt(index);

        // Add back to available authors
        this.availableAuthors.push(author);
        this.authors.push(this.fb.group(author));
    }

    // Method to handle form submission
    onSubmit(): void {
        this.submitted = true;
        if (this.courseForm.valid) {
            const formData = this.courseForm.value;
            const courseData = {
                title: formData.title,
                description: formData.description,
                duration: formData.duration,
                authors: this.courseAuthorsList, // You can customize this as needed
            };
            console.log("Course Data:", courseData);
            // Handle form submission logic here (e.g., send to server)
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

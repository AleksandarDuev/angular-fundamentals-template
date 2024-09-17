import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons"; // Example icon, replace as needed.

@Component({
    selector: "app-button",
    templateUrl: "./button.component.html",
    styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
    // Input properties for button text and icon name
    @Input() text?: string;
    @Input() iconName?: IconDefinition;

    constructor(library: FaIconLibrary) {
        // Add the icons you want to use to the library
        library.addIcons(faPencil); // Add the icons you need from FontAwesome
    }
}

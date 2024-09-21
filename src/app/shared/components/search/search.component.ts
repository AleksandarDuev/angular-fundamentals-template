import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
    @Input() placeholder: string = ""; // Input for placeholder
    @Output() search: EventEmitter<string> = new EventEmitter<string>(); // Output to emit search term

    searchTerm: string = ""; // For the two-way binding of the input field

    // Method to emit the search term when the button is clicked
    onSearch() {
        this.search.emit(this.searchTerm);
    }
}

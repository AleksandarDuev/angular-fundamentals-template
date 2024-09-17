import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  @Input() title!: string; // Required input for title
  @Input() text?: string | undefined;  // Optional input for text
}
// Use the names `title` and `text`.

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title?: string; // title for section
  @Input() items?: any[]; // what to iterate over (projects or employees)
}

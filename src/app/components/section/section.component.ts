import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title: string | undefined; // title for section
  @Input() items: any[] | undefined; // what to iterate over (projects or employees)
}

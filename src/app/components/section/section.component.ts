import { Component, Input } from '@angular/core';
import { SectionItemData } from 'src/app/home/home.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title?: string; // title for section
  @Input() items?: SectionItemData[]; // items for section
}

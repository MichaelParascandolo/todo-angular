import { Component, Input, NgIterable } from '@angular/core';
import { SectionItemData } from 'src/app/home/home.component';
import { EmployeeData } from 'src/app/home/home.component';
import { ProjectData } from 'src/app/home/home.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title?: string; // title for section
  @Input() items?: any;
}

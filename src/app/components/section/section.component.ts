import { Component, Input } from '@angular/core';
import { EmployeeData, ProjectData } from 'src/app/home/home.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent {
  @Input() title: string | undefined; // title for section
  @Input() projects?: ProjectData[]; // projects for section
  @Input() employees?: EmployeeData[]; // employees for section
}

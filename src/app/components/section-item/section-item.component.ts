import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
})
export class SectionItemComponent {
  @Input() name?: string;
  @Input() employee_id?: number;
  @Input() project_id?: number;
}

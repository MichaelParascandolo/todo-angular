import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './section-item.component.html',
})
export class SectionItemComponent {
  @Input() name: string | undefined;
}

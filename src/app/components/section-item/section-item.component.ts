import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-section-item',
  templateUrl: './section-item.component.html',
})
export class SectionItemComponent {
  HomeComponent: any;
  constructor(private http: HttpClient, private location: Location) {}
  @Input() name?: string;
  @Input() employee_id?: number;
  @Input() project_id?: number;
  @Input() getData?: any;

  // Reload page
  reloadPage() {
    this.location.replaceState(this.location.path(true));
    window.location.reload();
  }

  // Delete project
  deleteProject = () => {
    const confirmDelete = confirm(
      'Are you sure you wish to complete this project? This will delete all records of this project and related assignments and CANNOT be undone.'
    );
    if (confirmDelete) {
      this.http
        .delete<any>(
          `http://localhost:3000/api/projects-delete?project_id=${this.project_id}`
        )
        .pipe(
          tap((response: any) => {
            console.log('Project deleted:', response);
          }),
          catchError((error: string) => {
            return error; // returns an error but still works
          })
        )
        .subscribe();
      this.reloadPage();
    }
  };
}

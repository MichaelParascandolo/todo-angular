import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

export interface SectionItemData {
  employee_id?: number;
  project_id?: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  projects: SectionItemData[] = [];
  employees: SectionItemData[] = [];

  getEmployees = () => {
    this.http
      .get<any>('http://localhost:3000/api/employees')
      .pipe(
        tap((response: SectionItemData[]) => {
          this.employees = response;
          // console.log(this.employees);
        }),
        catchError((error: string) => {
          return error;
        })
      )
      .subscribe();
  };

  getProjects = () => {
    this.http
      .get<any>('http://localhost:3000/api/projects')
      .pipe(
        tap((response: SectionItemData[]) => {
          this.projects = response;
          // console.log(this.projects);
        }),
        catchError((error: string) => {
          return error;
        })
      )
      .subscribe();
  };

  ngOnInit() {
    this.getEmployees();
    this.getProjects();
  }
}

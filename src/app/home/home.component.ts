import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

export interface SectionItemData {
  projects: ProjectData[];
  employees: EmployeeData[];
  employee_id?: number;
  project_id?: number;
  name: string;
}

export interface EmployeeData {
  employee_id: number;
  project_id?: number;
  name: string;
}

export interface ProjectData {
  project_id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  projects: ProjectData[] = [];
  employees: EmployeeData[] = [];

  getData = () => {
    this.http
      .get<SectionItemData>('http://localhost:3000/api/employees-and-projects')
      .pipe(
        tap((response: SectionItemData) => {
          this.employees = response.employees;
          this.projects = response.projects;
        }),
        catchError((error: string) => {
          return error;
        })
      )
      .subscribe();
  };

  ngOnInit() {
    this.getData();
  }
}

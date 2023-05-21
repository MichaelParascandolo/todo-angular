import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

interface EmployeeData {
  employee_id: number;
  name: string;
}

interface ProjectData {
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

  getEmployees = () => {
    this.http
      .get<any>('http://localhost:3000/api/employees')
      .pipe(
        tap((response: EmployeeData[]) => {
          this.employees = response;
          // console.log(this.employees);
        }),
        catchError((error: any) => {
          return error;
        })
      )
      .subscribe();
  };

  getProjects = () => {
    this.http
      .get<any>('http://localhost:3000/api/projects')
      .pipe(
        tap((response: ProjectData[]) => {
          this.projects = response;
          // console.log(this.projects);
        }),
        catchError((error: any) => {
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

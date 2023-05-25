import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

interface AssignmentData {
  assignment_id: number;
  employee_id: number;
  employee_name: string;
  estimated_hours: number;
  name: string;
  project_id: number;
}

interface ProjectData {
  assignment_id: number;
  employee_names: string;
  project_id: number;
  project_name: string;
  total_estimated_hours: number;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  name?: string;
  projectID?: number;
  employeeID?: number;
  apiURL: string = '';
  totalHours: number = 0;

  assignments: AssignmentData[] = [];
  projects: ProjectData[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // set the total hours for the project
  setTotalHours = () => {
    for (let i = 0; i < this.assignments.length; i++) {
      this.totalHours += this.assignments[i].estimated_hours;
    }
  };

  // get data from the API
  getData = (
    projectId: number | undefined,
    employee_id: number | undefined
  ) => {
    if (projectId) {
      this.apiURL = `http://localhost:3000/api/assignments?projectId=${projectId}`;
    } else if (employee_id) {
      this.apiURL = `http://localhost:3000/api/employee-projects?employeeId=${employee_id}`;
    }
    this.http
      .get<AssignmentData[] | ProjectData[]>(this.apiURL)
      .pipe(
        tap((response: AssignmentData[] | ProjectData[]) => {
          console.log(response);
          if (projectId) {
            this.assignments = response as AssignmentData[];
            this.setTotalHours();
          } else if (employee_id) {
            this.projects = response as ProjectData[];
          }
        }),
        catchError((error: string) => {
          return error;
        })
      )
      .subscribe();
  };

  // reset data when coming from the employee page
  resetData = () => {
    console.log('RESET DATA');
    this.assignments = [];
    this.totalHours = 0;
    this.projects = [];
  };

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.projectID = params['projectID'];
      this.employeeID = params['employeeID'];
      this.getData(this.projectID, this.employeeID);
      // used for debugging
      console.log('Project ID: ' + this.projectID);
      console.log('Employee ID: ' + this.employeeID);
    });
  }
}

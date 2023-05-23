import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs';

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

  assignments: any = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  // set the total hours for the project
  setTotalHours = () => {
    for (let i = 0; i < this.assignments.length; i++) {
      this.totalHours += this.assignments[i].estimated_hours;
    }
  };

  // get data from the API
  getData = (projectId: number | undefined) => {
    this.http
      .get<any>(`http://localhost:3000/api/assignments?projectId=${projectId}`)
      .pipe(
        tap((response: any) => {
          console.log(response);
          // sort assignments by assignment_id
          response.sort((a: any, b: any) => {
            return a.assignment_id - b.assignment_id;
          });
          // set assignments to the response
          this.assignments = response;
          // set total hours
          this.setTotalHours();
        }),
        catchError((error: any) => {
          return error;
        })
      )
      .subscribe();
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.name = params['name'];
      this.projectID = params['projectID'];
      this.employeeID = params['employeeID'];
      this.getData(this.projectID);
      // used for debugging
      // console.log('Project ID: ' + this.projectID);
      // console.log('Employee ID: ' + this.employeeID);
    });
  }
}

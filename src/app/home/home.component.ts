import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  projects = [
    {
      projectId: 1,
      name: 'E-Commerce Website',
    },
    {
      projectId: 2,
      name: 'Websocket Updates',
    },
    {
      projectId: 3,
      name: 'Angular Upgrade',
    },
  ];

  employees = [
    {
      employeeId: 1,
      name: 'Adam',
    },
    {
      employeeId: 2,
      name: 'Tyler',
    },
    {
      employeeId: 3,
      name: 'Lan',
    },
    {
      employeeId: 4,
      name: 'Stuart',
    },
  ];
}

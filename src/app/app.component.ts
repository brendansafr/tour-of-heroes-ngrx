import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { LogComponent } from './log/log.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tour of Heroes';

  links = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Heroes',
      path: '/heroes',
    },
  ];

  isLinkActive(i: number) {
    return this.router.url == this.links[i].path;
  }

  constructor(private router: Router, public matDialog: MatDialog) {}

  openLogDialog(): void {
    this.matDialog.open(LogComponent);
  }
}

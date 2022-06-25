import { HeroService } from './../hero.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  loadIndicator: number = 0;

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

  constructor(
    private router: Router,
    public matDialog: MatDialog,
    public _service: HeroService
  ) {}

  isLinkActive(i: number) {
    return this.router.url == this.links[i].path;
  }

  openLogDialog(): void {
    this.matDialog.open(LogComponent);
  }

  refresh(): void {
    this._service.refresh();
  }
}

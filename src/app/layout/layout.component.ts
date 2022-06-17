import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';

import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
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

  constructor(
    private router: Router,
    public matDialog: MatDialog,
    private _heroService: HeroService
  ) {}

  openLogDialog(): void {
    this.matDialog.open(LogComponent);
  }

  ngOnInit(): void {
    this._heroService.getHeroes();
  }
}

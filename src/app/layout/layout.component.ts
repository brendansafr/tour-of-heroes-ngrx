import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeroService } from '../hero.service';
import { LoadingService } from '../loading.service';

import { LogComponent } from '../log/log.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
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

  isLinkActive(i: number) {
    return this.router.url == this.links[i].path;
  }

  constructor(
    private router: Router,
    public matDialog: MatDialog,
    private _heroService: HeroService,
    private _loadingService: LoadingService
  ) {}

  openLogDialog(): void {
    this.matDialog.open(LogComponent);
  }

  ngOnInit(): void {
    this._loadingService.setLoadIndicator(this.loadIndicator, true);
    this._heroService.refresh(() => {
      this._loadingService.setLoadIndicator(this.loadIndicator, false);
    });
  }
}

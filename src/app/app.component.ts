import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}
}

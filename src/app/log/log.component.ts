import { Component } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { LogService } from './log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent {
  constructor(
    public dialogRef: MatDialogRef<LogComponent>,
    public service: LogService
  ) {}
}

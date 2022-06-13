import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MessagesComponent>,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}
}

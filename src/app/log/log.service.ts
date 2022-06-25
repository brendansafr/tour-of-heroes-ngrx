import { Injectable } from '@angular/core';

import { MessagesService } from './../messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  public log: string[] = [];

  constructor(private _messagesService: MessagesService) {}

  getLog(): string[] {
    return this.log;
  }

  postLog(message: string) {
    this.log.unshift(message);
  }

  clearLog() {
    this.log = [];
  }
}

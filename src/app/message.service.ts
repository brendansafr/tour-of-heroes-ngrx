import { Injectable } from '@angular/core';

import { LogService } from './log/log.service';
import { MessagesService } from './messages/messages.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private _logService: LogService,
    private _messagesService: MessagesService
  ) {}

  add(message: string) {
    this._logService.add(new Date().toLocaleString() + ': ' + message);
  }
}

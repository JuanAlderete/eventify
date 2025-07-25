// src/app/services/toast.service.ts
import { Injectable, signal } from '@angular/core';
import { v4 as uuid } from 'uuid'

export interface ToastMessage {
  id?: string;
  text: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messages = signal<ToastMessage[]>([]);
  public readonly toasts = this.messages.asReadonly();

  private show(message: ToastMessage) {
    const withId = { ...message, id: uuid() };
    this.messages.update(current => [...current, withId]);

    setTimeout(() => {
      this.messages.update(current => current.filter(t => t.id !== withId.id));
    }, message.duration || 3000);
  }

  success(text: string, duration = 3000) {
    this.show({ text, type: 'success', duration });
  }

  error(text: string, duration = 3000) {
    this.show({ text, type: 'error', duration });
  }

  info(text: string, duration = 3000) {
    this.show({ text, type: 'info', duration });
  }
}
// src/app/components/toast/toast.component.ts
import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { ToastService, ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent implements OnInit {
  toasts = signal<ToastMessage[]>([]);

  constructor(private toastService: ToastService) {
    effect(() => {
      this.toasts.set(this.toastService.toasts());
    });
  }

  ngOnInit(): void {
  }
}

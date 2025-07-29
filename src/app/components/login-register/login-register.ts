import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-register.html',
  styleUrl: './login-register.scss'
})
export class LoginRegisterComponent implements OnInit {

  passwordVisible = false;
  loginForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authSrv: AuthService, private readonly toastSrv: ToastService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.authSrv.register('User', 'user@user.com', '123456').then(user => {
      user.subscribe({
        next: (res) => {
          console.log('Usuario registrado', res);
          this.toastSrv.success('Usuario registrado');
        },
        error: (err) => {
          console.log('Error al registrar', err.cause);
          this.toastSrv.error(err);
        }
      })
    })
  }

  login() {
    console.log('login');
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    if (emailControl?.invalid || passwordControl?.invalid) {
      return;
    }
    this.authSrv.login(this.loginForm.value.email, this.loginForm.value.password).then(user => {
      user.subscribe({
        next: (res) => {
          console.log('Usuario logueado', res);
          this.toastSrv.success('Usuario logueado');
        },
        error: (err) => {
          console.log('Error al loguear', err.cause);
          if (err.cause === 'EMAIL_NOT_FOUND' && emailControl) {
            emailControl.setErrors({ required: true });
            emailControl.markAsTouched();
          } else if (err.cause === 'PASSWORD_INCORRECT' && passwordControl) {
            passwordControl.setErrors({ required: true });
            passwordControl.markAsTouched();
          }
          this.toastSrv.error(err);
        }
      })
    })
  }

}

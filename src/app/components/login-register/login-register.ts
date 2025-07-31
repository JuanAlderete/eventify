import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
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

  @Input() type: 'login' | 'register' = 'register';
  @Input() showModal!: WritableSignal<boolean>;

  passwordVisible = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authSrv: AuthService, private readonly toastSrv: ToastService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
      {
        validators: [this.passwordsMatchValidator]
      })
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  ngOnInit() {
    //this.authSrv.register('User', 'user@user.com', '123456').then(user => {
    //  user.subscribe({
    //    next: (res) => {
    //      console.log('Usuario registrado', res);
    //      this.toastSrv.success('Usuario registrado');
    //    },
    //    error: (err) => {
    //      console.log('Error al registrar', err.cause);
    //      this.toastSrv.error(err);
    //    }
    //  })
    //})
  }

  login() {
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
          this.closeModal();
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

  register() {
    const nameControl = this.registerForm.get('name');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    if (nameControl?.invalid || emailControl?.invalid || passwordControl?.invalid) {
      return;
    }
    this.authSrv.register(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password).then(user => {
      user.subscribe({
        next: (res) => {
          console.log('Usuario registrado', res);
          this.toastSrv.success('Usuario registrado');
          this.closeModal();
        },
        error: (err) => {
          console.log('Error al loguear', err.cause);
          if (err.cause === 'EMAIL_NOT_FOUND' && emailControl) {
            emailControl.setErrors({ required: true });
            emailControl.markAsTouched();
          }
          this.toastSrv.error(err);
        }
      })
    })
  }

  ngOnDestroy() {
    this.passwordVisible = false;
  }

  closeModal() {
    this.showModal.set(false);
  }

  onBackdropClick(event: Event) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}

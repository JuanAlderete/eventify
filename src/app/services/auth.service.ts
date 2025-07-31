import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { v4 as uuid } from 'uuid'
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  
  // Signal público para que los componentes se suscriban
  public currentUser = this.currentUserSignal.asReadonly();

  constructor() {
    this.initializeCurrentUser();
  }

  private initializeCurrentUser() {
    const session = localStorage.getItem('session');
    if (session) {
      try {
        const sessionEmail = JSON.parse(session);
        const existingUsersJson = localStorage.getItem('users');
        const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
        const userData = existingUsers.find(user => user.email === sessionEmail);
        if (userData) {
          this.currentUserSignal.set(userData);
        }
      } catch (error) {
        localStorage.removeItem('session');
      }
    }
  }

  async register(username: string, email: string, password: string): Promise<Observable<User>> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      return throwError(() => new Error('Email inválido'));
    }
    if (!password || password.trim().length === 0) {
      return throwError(() => new Error('La contraseña no puede estar vacía'));
    }
    const existingUsersJson = localStorage.getItem('users');
    const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    const emailExists = existingUsers.some(user => user.email === email);
    if (emailExists) {
      return throwError(() => new Error('Ya existe un usuario con ese email'));
    }
    const hashedPassword = await this.hashPassword(password);
    const userData: User = {
      id: uuid(),
      name: username || 'User',
      email,
      password: hashedPassword
    };
    existingUsers.push(userData);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('session', JSON.stringify(userData!.email));
    
    this.currentUserSignal.set(userData);
    
    return of(userData);
  }

  async login(email: string, password: string): Promise<Observable<User>> {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      return throwError(() => new Error('Email inválido'));
    }
    if (!password || password.trim().length === 0) {
      return throwError(() => new Error('La contraseña no puede estar vacía'));
    }
    const existingUsersJson = localStorage.getItem('users');
    const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
    const emailExists = existingUsers.some(user => user.email === email);
    if (!emailExists) {
      return throwError(() => new Error('Usuario no encontrado', {
        cause: 'EMAIL_NOT_FOUND'
      }));
    }
    const userData = existingUsers.find(user => user.email === email);
    const hashedInput = await this.hashPassword(password);
    if (userData!.password !== hashedInput) {
      return throwError(() => new Error('Contraseña incorrecta', {
        cause: 'PASSWORD_INCORRECT'
      }));
    }
    localStorage.setItem('session', JSON.stringify(userData!.email));
    
    this.currentUserSignal.set(userData!);
    
    return of(userData!);
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('session');
    this.currentUserSignal.set(null);
    return of(true);
  }

  getCurrentUser(): Observable<User | null> {
    const session = localStorage.getItem('session');
    if (!session) {
      return of(null);
    }
    try {
      const sessionEmail = JSON.parse(session);
      const existingUsersJson = localStorage.getItem('users');
      const existingUsers: User[] = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      const userData = existingUsers.find(user => user.email === sessionEmail);
      return of(userData || null);
    } catch (error) {
      localStorage.removeItem('session');
      return of(null);
    }
  }

  isLoggedInSignal() {
    return this.currentUserSignal() !== null;
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}

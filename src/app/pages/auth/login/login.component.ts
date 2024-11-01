import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  username = '';
  password = '';
  router = inject(Router);

  constructor(private http: HttpClient) { } // Inject HttpClient

  onSubmit() {
    const userData = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/auth/login', userData).subscribe({
      next: (response: any) => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('accessToken', response?.accessToken);
        this.router.navigate(['user/dashboard']);
      },
      error: (error) => {
        console.error('Login error:', error);
      }
    });
  }
}

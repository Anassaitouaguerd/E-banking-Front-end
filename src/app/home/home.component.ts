import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  role: string;
  token: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, LoginFormComponent, RegisterFormComponent , HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly API_URL = 'http://localhost:8080/api/v1/auth/login';
  isActive = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeFormListeners();
    this.initializeAuthButton();
  }

  private initializeFormListeners(): void {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = form.querySelector<HTMLInputElement>('input[name="username"]');
      const password = form.querySelector<HTMLInputElement>('input[name="password"]');
      
      if (username && password) {
        this.login(username, password);
      }
    });
  }

  private initializeAuthButton(): void {
    const authButton = document.querySelector('.hero');
    if (authButton) {
      this.handleComponentForms(authButton as HTMLElement);
    }
  }

  private login(
    usernameElement: HTMLInputElement,
    passwordElement: HTMLInputElement
  ): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const loginData: LoginRequest = {
      username: usernameElement.value,
      password: passwordElement.value
    };

    this.http.post<LoginResponse>(this.API_URL, loginData, { 
      headers,
      withCredentials: true 
    }).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error)
    });
  }

  private handleLoginSuccess(data: LoginResponse): void {
    console.log('Login successful:', data);
    if (data.token) {
      localStorage.clear();
      localStorage.setItem('token', data.token);
      
      if (data.role === 'USER') {
        this.router.navigate(['/user-page']);
      } else if (data.role === 'ADMIN') {
        this.router.navigate(['/dashboard']);
      }
    }
  }

  private handleLoginError(error: HttpErrorResponse): void {
    console.error('Login error:', error);
    if (error.status === 401) {
      console.error('Unauthorized access');
    } else if (error.status === 404) {
      console.error('API endpoint not found');
    }
  }

  private handleComponentForms(button: HTMLElement): void {
    button.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      
      if (target.matches('.loginForm')) {
        this.isActive = true;
      } else if (target.matches('.registerForm')) {
        this.isActive = false;
      }
    });
  }
}
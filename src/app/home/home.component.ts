import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

interface LoginResponse {
  role: string;
  token: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, LoginFormComponent, RegisterFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  private readonly API_URL = 'http://localhost:8080/api/v1/auth/login';
  isActive = true;

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
        await this.login(username, password);
      }
    });
  }

  private initializeAuthButton(): void {
    const authButton = document.querySelector('.hero');
    if (authButton) {
      this.handleComponentForms(authButton as HTMLElement);
    }
  }

  private async login(
    usernameElement: HTMLInputElement,
    passwordElement: HTMLInputElement
  ): Promise<void> {
    try {
      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'same-origin',
        body: JSON.stringify({
          username: usernameElement.value,
          password: passwordElement.value
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json() as LoginResponse;
      this.handleLoginSuccess(data);
    } catch (error) {
      this.handleLoginError(error);
    }
  }

  private handleLoginSuccess(data: LoginResponse): void {
    console.log('Login successful:', data);
    if (data.token) {
      localStorage.clear();
      localStorage.setItem('token', data.token);
      if(data.role == 'USER'){
        window.location.href = 'user-page';
      }else if(data.role == 'ADMIN'){
        window.location.href = 'dashboard';
        
      }
    }
  }

  private handleLoginError(error: unknown): void {
    console.error('Login error:', error);
  }

  private handleComponentForms(button: HTMLElement): void {
    button.addEventListener('click' , (event) => {
      
      if(event.target == button.querySelector(".loginForm")){
        this.isActive = true;
      }else if(event.target == button.querySelector(".registerForm")){
        this.isActive = false
      }
    });
    
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

interface RegisterResponse {
  message: string;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private readonly API_URL = "http://localhost:8080/api/v1/auth/register";
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', Validators.required],
      monthlyIncome: ['', [Validators.required, Validators.min(0)]],
      collateralAvailable: ['', Validators.required],
      customerSince: [''],
      role: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.register(this.registerForm.value);
    }
  }

  private register(formData: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    this.http.post<RegisterResponse>(this.API_URL, formData, {
      headers,
      withCredentials: true
    }).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error: HttpErrorResponse) => {
        this.handleRegistrationError(error);
      }
    });
  }

  private handleRegistrationError(error: HttpErrorResponse): void {
    console.error('Registration error:', error);
    
    if (error.status === 400) {
      console.error('Bad request - Invalid data');
      
    } else if (error.status === 409) {
      console.error('Conflict - User might already exist');
      
    } else if (error.status === 0) {
      console.error('Network error or server is not responding');
      
    } else {
      console.error(`Server error: ${error.status}`);
    
    }
  }
}
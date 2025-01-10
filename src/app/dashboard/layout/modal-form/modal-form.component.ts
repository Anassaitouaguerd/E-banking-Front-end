import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user/user-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , HttpClientModule],
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.css'
})
export class ModalFormComponent {
  @Input() isActive = false;
  @Output() changeEvent = new EventEmitter<boolean>();
  
  userForm: FormGroup;

  constructor(private fb: FormBuilder , private userService: UserService) {
    this.userForm = this.fb.group({
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
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value);
      this.changeEvent.emit(false);
    }
  }

  onCancel() {
    this.userForm.reset();
    this.changeEvent.emit(false);
  }
}
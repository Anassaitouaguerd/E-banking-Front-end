import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction/transaction.service';

@Component({
  selector: 'app-modal-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-transaction.component.html',
  styleUrl: './modal-transaction.component.css'
})
export class ModalTransactionComponent {
  @Input() isActive = false;
  @Output() changeEvent = new EventEmitter<boolean>();
  
  transactionForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transactionForm = this.fb.group({
      accountId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      transactionType: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: () => {
          this.changeEvent.emit(false);
        },
        error: (error) => {
          console.error('Error creating transaction:', error);
        }
      });
    }
  }

  onCancel() {
    this.transactionForm.reset();
    this.changeEvent.emit(false);
  }
}

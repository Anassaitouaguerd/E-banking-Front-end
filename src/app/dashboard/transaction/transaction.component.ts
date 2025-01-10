import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../service/transaction/transaction.service';
import { ModalTransactionComponent } from "../layout/modal-transaction/modal-transaction.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, DatePipe } from '@angular/common';

interface TransactionDTO {
  id: number;
  accountId: number;
  amount: number;
  transactionType: string;
  status: string;
  remarks?: string;
  createdBy: string;
  createdAt: Date;
  approvedBy?: string;
  approvedAt?: Date;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, ModalTransactionComponent , MatIconModule ,CommonModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
  providers: [DatePipe]
})
export class TransactionComponent {
  transactions: TransactionDTO[] = [];
  isActive = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }

  handleChange(data: boolean) {
    if (!data) {
      this.isActive = false;
      this.loadTransactions();
    }
  }

  addNew() {
    this.isActive = true;
  }

  approveTransaction(id: number) {
    this.transactionService.approveTransaction(id).subscribe({
      next: () => {
        this.loadTransactions();
      },
      error: (error) => {
        console.error('Error approving transaction:', error);
      }
    });
  }

  rejectTransaction(id: number) {
    const remarks = prompt('Enter rejection remarks:');
    if (remarks) {
      this.transactionService.rejectTransaction(id, remarks).subscribe({
        next: () => {
          this.loadTransactions();
        },
        error: (error) => {
          console.error('Error rejecting transaction:', error);
        }
      });
    }
  }
}

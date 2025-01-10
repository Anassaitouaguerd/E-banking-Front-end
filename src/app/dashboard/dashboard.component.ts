  import { CommonModule } from '@angular/common';
  import { Component } from '@angular/core';
  import { ModalFormComponent } from "./layout/modal-form/modal-form.component";
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  import { HttpClientModule } from '@angular/common/http';
  import { UserService } from './service/user/user-service.service';
  import { SideBarComponent } from "./layout/side-bar/side-bar.component";
  import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from "./user/user.component";
import { TransactionComponent } from "./transaction/transaction.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    ModalFormComponent,
    CommonModule,
    FormsModule,
    MatIconModule,
    UserComponent,
    TransactionComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  currentSection = 'dashboard';
  isActive = false;
  receveResp: boolean = true;

  onSectionChange(section: string) {
    this.currentSection = section;
  }

  handleChange(data: boolean) {
    this.receveResp = data;
    if(this.receveResp === false) {
      this.isActive = false;
    }
  }

  addNew() {
    this.isActive = true;
  }
}
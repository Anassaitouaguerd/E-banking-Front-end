import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFormComponent } from "../layout/modal-form/modal-form.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../service/user/user-service.service';
import { MatIconModule } from '@angular/material/icon';


interface Activity {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  email: string
  collateralAvailable: string;
  status: 'Completed' | 'Error';
  customerSince: Date;
  monthlyIncome: number;
  birthday: Date;
}

interface UserVM {
  id: number;
  username: string;
  email: string;
  customerSince: Date;
  monthlyIncome: number;
  collateralAvailable: string;
  birthday: Date;
}


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    ModalFormComponent,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  activities: Activity[] = [];
  isActive = false;
  receveResp: boolean = true;

  constructor(private userService: UserService){ }

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((response: any) => {
      const users = response as UserVM[];
      users.forEach(user => {
      this.activities.push({
        id: user.id,
        user: {
          name: user.username,
          avatar: '../../../../assets/img/placeholder.png'
        },
        email: user.email,
        collateralAvailable: user.collateralAvailable,
        status: 'Completed',
        customerSince: user.customerSince,
        monthlyIncome: user.monthlyIncome,
        birthday: user.birthday
      })
      });
      
    });
  }

  handleChange(data: boolean) {
    this.receveResp = data;
    if(this.receveResp === false) {
      this.isActive = false;
      this.activities = [];
      this.getAllUsers();
    }
  }

  addNew() {
    console.log('Add new activity');
    this.isActive = true;
  }

  editActivity(activity: Activity) {
    console.log('Edit activity:', activity);
  }

  deleteActivity(id: number) {
    console.log('Delete activity:', id);
  }
}

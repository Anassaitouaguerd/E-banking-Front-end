import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';

interface MenuItem {
  icon: string;
  label: string;
  id: string
}

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [MatIconModule , RouterModule , CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  @Output() sectionChange = new EventEmitter<string>();
  
  isCollapsed = false;
  currentSection = 'dashboard';
  
  menuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', id: 'dashboard' },
    { icon: 'person', label: 'Users', id: 'users' },
    { icon: 'attach_money', label: 'Transactions', id: 'transactions' },
    { icon: 'settings', label: 'Settings', id: 'settings' }
  ];

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  selectSection(sectionId: string): void {
    this.currentSection = sectionId;
    this.sectionChange.emit(sectionId);
  }

  logout(): void {
    console.log('Logging out...');
  }
}

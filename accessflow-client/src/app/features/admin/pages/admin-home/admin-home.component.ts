
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { UserService } from '../../../../core/services/user.service';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-admin-home',

  standalone: true,

  imports: [CommonModule, FormsModule],

  templateUrl: './admin-home.component.html',

  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent
  implements OnInit
{
  users: any[] = [];

  loading = true;

  formData = {
    name: '',

    userId: '',

    password: '',

    role: 'General User',
  };

  editingUserId = '';

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;

        this.loading = false;
      },
    });
  }

  submitForm() {
    if (this.editingUserId) {
      this.userService
        .updateUser(this.editingUserId, {
          name: this.formData.name,

          role: this.formData.role,
        })
        .subscribe(() => {
          this.resetForm();

          this.fetchUsers();
        });
    } else {
      this.userService
        .createUser(this.formData)
        .subscribe(() => {
          this.resetForm();

          this.fetchUsers();
        });
    }
  }

  editUser(user: any) {
    this.editingUserId = user._id;

    this.formData = {
      name: user.name,

      userId: user.userId,

      password: '',

      role: user.role,
    };
  }

  deleteUser(id: string) {
    if (!confirm('Delete User?')) return;

    this.userService
      .deleteUser(id)
      .subscribe(() => {
        this.fetchUsers();
      });
  }

  resetForm() {
    this.editingUserId = '';

    this.formData = {
      name: '',

      userId: '',

      password: '',

      role: 'General User',
    };
  }

  logout() {
    this.authService.logout();
  }
}
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RecordService } from '../../../../core/services/record.service';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard-home',

  standalone: true,

  imports: [CommonModule],

  templateUrl: './dashboard-home.component.html',

  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent
  implements OnInit
{
  loading = true;

  records: any[] = [];

  user: any;

  constructor(
    private recordService: RecordService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();

    this.fetchRecords();
  }

  fetchRecords() {
    this.recordService
      .getRecords(3000)
      .subscribe({
        next: (response: any) => {
          this.records = response.records;

          this.loading = false;
        },

        error: () => {
          this.loading = false;
        },
      });
  }

  logout() {
    this.authService.logout();
  }
}
import { Component, inject, OnInit } from '@angular/core';
import { Stat } from '../../../core/interfaces/stat';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private userService = inject(UsersService);
  stats!: Stat;

  ngOnInit() {
    // call get stat data once on component initialization
    this.getData();
  }

  getData() {
    //  this method retrieves data and stores it in the stats variable
    this.stats = this.userService.getStats();
  }
}

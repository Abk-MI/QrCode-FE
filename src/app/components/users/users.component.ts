import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource: any[] = [];
  dataSourcePresent: any[] = [];
  dataSourceAbsent: any[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe((res) => {
      this.dataSource = res.data;
    });
    this.usersService.getLoggedInUsers().subscribe((res) => {
      this.dataSourcePresent = res.data;
    });
    this.usersService.getNotLoggedInUsers().subscribe((res) => {
      this.dataSourceAbsent = res.data;
    });
  }
}

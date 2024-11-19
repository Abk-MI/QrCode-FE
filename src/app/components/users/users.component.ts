import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email'];
  dataSource: any[] = [];

  constructor(private usersService: UsersService) {
    this.usersService.getAllUsers().subscribe((res) => {
      this.dataSource = res.data;
    });
  }
}

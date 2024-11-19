import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [MatSnackBarModule, MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})

export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private UsersService: UsersService, private snackBar: MatSnackBar) {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
    });
  }

  onSubmit(): void {
    this.UsersService.addUser(this.userForm.value).subscribe(() => {
      this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
      this.userForm.reset();
    });
  }
}


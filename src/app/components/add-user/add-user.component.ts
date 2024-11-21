import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from '../../material.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent {
  userForm: FormGroup;

  qrcodedata = '';
  @ViewChild('qrcodeElement', { static: false, read: ElementRef })
  qrcodeElement!: ElementRef;

  base64Image: string = '';

  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  generateBase64() {
    if (this.qrcodeElement) {
      const canvas = this.qrcodeElement.nativeElement.querySelector('canvas');
      if (canvas) {
        this.base64Image = canvas.toDataURL('image/png');
        console.log('Base64 Image:', this.base64Image);
        return;
      } else {
        return;
      }
    } else {
      return;
    }
  }

  onSubmit(): void {
    this.qrcodedata = this.UsersService.generateQrCodeLink(
      this.userForm.value.email
    );
  }

  onChangeURL(url: SafeUrl) {
    if (this.qrcodeElement && this.qrcodedata) {
      const canvas = this.qrcodeElement.nativeElement.querySelector('canvas');
      if (canvas) {
        this.base64Image = canvas.toDataURL('image/png');

        this.UsersService.addUser(
          this.userForm.value,
          this.base64Image
        ).subscribe(
          (res) => {
            this.snackBar.open(`${res.message} !`, 'Close', {
              duration: 3000,
            });

            this.userForm.reset();
          },
          (err) => {
            this.snackBar.open('Error adding user!', 'Close', {
              duration: 3000,
            });
          }
        );
      }
    }
  }
}

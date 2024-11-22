import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
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
    TranslateModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  currentLang: string = 'fr';
  userForm: FormGroup;
  states = [
    { fr: 'Tunis', ar: 'تونس' },
    { fr: 'Ariana', ar: 'أريانة' },
    { fr: 'Béja', ar: 'باجة' },
    { fr: 'Ben Arous', ar: 'بن عروس' },
    { fr: 'Bizerte', ar: 'بنزرت' },
    { fr: 'Gabès', ar: 'قبلي' },
    { fr: 'Gafsa', ar: 'قفصة' },
    { fr: 'Jendouba', ar: 'جندوبة' },
    { fr: 'Kairouan', ar: 'القيروان' },
    { fr: 'Kasserine', ar: 'القصرين' },
    { fr: 'Kebili', ar: 'قبلي' },
    { fr: 'Kef', ar: 'الكاف' },
    { fr: 'Mahdia', ar: 'المهدية' },
    { fr: 'Manouba', ar: 'منوبة' },
    { fr: 'Medenine', ar: 'مدنين' },
    { fr: 'Monastir', ar: 'المنستير' },
    { fr: 'Nabeul', ar: 'نابل' },
    { fr: 'Sfax', ar: 'صفاقس' },
    { fr: 'Sidi Bouzid', ar: 'سيدي بوزيد' },
    { fr: 'Siliana', ar: 'سليانة' },
    { fr: 'Sousse', ar: 'سوسة' },
    { fr: 'Tozeur', ar: 'توزر' },
    { fr: 'Tataouine', ar: 'تطاوين' },
    { fr: 'Zaghouan', ar: 'زغوان' },
    { fr: 'Djerba', ar: 'جرجيس' },
  ];

  qrcodedata = '';
  @ViewChild('qrcodeElement', { static: false, read: ElementRef })
  qrcodeElement!: ElementRef;

  base64Image: string = '';

  constructor(
    private fb: FormBuilder,
    private UsersService: UsersService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    this.translate.setDefaultLang('fr');
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (['fr', 'ar'].includes(params['lang'])) {
        this.currentLang = params['lang'];
        this.translate.use(this.currentLang);
        this.switchLanguage(this.currentLang);
      }
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
    console.log('onChangeURL', url);

    if (this.qrcodeElement && this.qrcodedata) {
      const canvas = this.qrcodeElement.nativeElement.querySelector('canvas');
      if (canvas) {
        this.base64Image = canvas.toDataURL('image/png');

        console.log('gonna add user api');

        this.UsersService.addUser(
          this.userForm.value,
          this.base64Image,
          this.currentLang
        ).subscribe(
          (res) => {
            console.log('getting response');

            this.snackBar.open(`${res.message} !`, 'Close', {
              duration: 3000,
            });

            this.userForm.reset();

            this.qrcodedata = '';
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

  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentLang = language;

    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  }
}

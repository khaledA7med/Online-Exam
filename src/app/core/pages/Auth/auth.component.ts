import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    DropdownModule,
    RouterModule,
    ToastModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [MessageService],
})
export class AuthComponent {
  langs: any[] = [];
  selectedLang: string = 'English';

  constructor() {
    this.langs = ['English', 'Arabic'];
  }
}

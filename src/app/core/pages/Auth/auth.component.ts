import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/components/ui/shared/shared.module';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  langs: any[] = [];
  selectedLang: string = 'English';

  constructor() {
    this.langs = ['English', 'Arabic'];
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    RouterModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    ToastModule,
  ],
  exports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    DropdownModule,
    RouterModule,
    ButtonModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    MessagesModule,
    ToastModule,
  ],
})
export class SharedModule {}

import { Component } from '@angular/core';
import { SharedModule } from '../../shared/components/ui/shared/shared.module';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SharedModule, ProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  value: Number = 70;
}

import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { CstmButtonComponent } from "../../shared/cstm-button/cstm-button.component";

@Component({
  selector: 'app-topnav',
  imports: [MaterialModule, CstmButtonComponent],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css'
})
export class TopnavComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
}

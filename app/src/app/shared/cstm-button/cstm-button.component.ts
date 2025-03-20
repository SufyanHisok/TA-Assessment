import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-cstm-button',
  imports: [MaterialModule],
  templateUrl: './cstm-button.component.html',
  styleUrl: './cstm-button.component.css'
})
export class CstmButtonComponent {
  @Input() label: string = '';
  @Input() icon?: string; 
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}

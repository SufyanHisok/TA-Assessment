import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-converstion-history',
  imports: [MaterialModule],
  templateUrl: './converstion-history.component.html',
  styleUrl: './converstion-history.component.css'
})
export class ConverstionHistoryComponent {

  @Input() data: any[] = [];
  @Output() deleteEntry = new EventEmitter<number>();

  constructor() { 
   
  }

  onDelete(id: number) {
    this.deleteEntry.emit(id); //notify currency conversion component
  }




}

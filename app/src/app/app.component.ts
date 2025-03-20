import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { SidenavComponent } from "./layout/sidenav/sidenav.component";
import { TopnavComponent } from "./layout/topnav/topnav.component";
import { CurrencyConverterComponent } from "./feat/currency-converter/currency-converter.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule, SidenavComponent, TopnavComponent, CurrencyConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  isDesktop = window.innerWidth > 768;

  title = 'app';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isDesktop = event.target.innerWidth > 768;
  }
}

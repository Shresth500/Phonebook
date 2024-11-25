import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ContactComponent } from '../contact-page/contact/contact.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [MenuComponent, ContactComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}

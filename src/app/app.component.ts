import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateOrderComponent } from './create-order/create-order.component';

imports: [
  CreateOrderComponent
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CreateOrderComponent],
  template: `<app-create-order></app-create-order>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PizzaOrderingSystem';
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Size {
  name: string;
  price: number;
}

interface Topping {
  name: string;
  type: ToppingType;
  price: number;
}

interface Pizza {
  toppings: Topping[];
  size: Size;
  quantity: number;
}

enum ToppingType {
  NonVeg = 0,
  Veg = 1
}

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent {

  public ToppingType = ToppingType;

  // Initialize values for Pizza, Size and Toppings
  sizes: Size[] = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 },
  ];

  pizza: { [key: string]: Pizza } = {
    small: { toppings: [], size: this.sizes[0], quantity: 1 },
    medium: { toppings: [], size: this.sizes[1], quantity: 1 },
    large: { toppings: [], size: this.sizes[2], quantity: 1 },
    extraLarge: { toppings: [], size: this.sizes[3], quantity: 1 },
  };

  toppings: Topping[] = [
    { name: 'Tomatoes', type: ToppingType.Veg, price: 1.00 },
    { name: 'Onions', type: ToppingType.Veg, price: 0.50 },
    { name: 'Bell Pepper', type: ToppingType.Veg, price: 1.00 },
    { name: 'Mushrooms', type: ToppingType.Veg, price: 1.20 },
    { name: 'Pineapple', type: ToppingType.Veg, price: 0.75 },
    { name: 'Sausage', type: ToppingType.NonVeg, price: 1.00 },
    { name: 'Pepperoni', type: ToppingType.NonVeg, price: 2.00 },
    { name: 'Barbecue Chicken', type: ToppingType.NonVeg, price: 3.00 },
  ];

  // Calculate total price for a pizza size
  calculateTotalPrice(size: string): number {
    let total = 0;
    let toppingCount = 0;
    const selectedPizza = this.pizza[size];
    
    const selectedToppings = selectedPizza.toppings;
    if (selectedToppings.length === 0) {
      return 0;
    }
  
    total += selectedPizza.size.price * selectedPizza.quantity;

    selectedPizza.toppings.forEach(topping => {
      total += topping.price;
      toppingCount++;
      if (topping.name === 'Pepperoni' || topping.name === 'Barbecue Chicken') { // Count Pepperoni and Barbecue Chicken as 2 toppings
        toppingCount++;
      }
    });
  
    // Apply offers
    if (size === 'medium') {
      if (toppingCount === 2) { // Offer 1
        return 5;
      } else if (toppingCount >= 4 && this.pizza[size].quantity >= 2) { // Offer 2
        return 9;
      }
    } else if (size === 'large' && toppingCount >= 4) { // Offer 3 - 50% discount
      return total * 0.5;
    }

    return total;
  }

  // Display Offer message based on selected toppings
  offerMessage(sizeName: string): string {
    const selectedToppings = this.pizza[sizeName].toppings;
    let toppingCount = 0;

    selectedToppings.forEach(topping => {
      if (topping.name === 'Pepperoni' || topping.name === 'Barbecue Chicken') { // Count Pepperoni and Barbecue Chicken as 2 toppings
        toppingCount += 2;
      } else {
        toppingCount++;
      }
    });

    // Check offer conditions
    if (sizeName === 'medium') {
      if (toppingCount === 2) {
        return 'Offer 1 Applied';
      } else if (toppingCount >= 4 && this.pizza['medium'].quantity >= 2) {
        return 'Offer 2 Applied';
      }
    } else if (sizeName === 'large' && toppingCount >= 4) {
      return 'Offer 3 Applied';
    }

    return 'N/A';
  }

  // Calculate full total for all pizzas
  calculateFullTotal(): number {
    let total = 0;

    for (const size in this.pizza) {
      total += this.calculateTotalPrice(size);
    }

    return total;
  }

  // Increment pizza quantity
  incrementQuantity(size: string): void {
    this.pizza[size].quantity++;
  }

  // Decrement pizza quantity, ensuring it doesn't go below 1
  decrementQuantity(size: string): void {
    if (this.pizza[size].quantity > 1) {
      this.pizza[size].quantity--;
    }
  }

  onToppingChange(size: string, topping: Topping, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
  
    if (checkbox.checked) {
      this.pizza[size].toppings.push(topping); // Add the topping to the pizza of the given size
    } else {
      const index = this.pizza[size].toppings.findIndex(t => t.name === topping.name); // Remove the topping from the pizza of the given size
      if (index !== -1) {
        this.pizza[size].toppings.splice(index, 1);
      }
    }
  }
}

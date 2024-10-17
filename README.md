# PizzaOrderingSystem

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.8.

# Type Definitions

Size {
  name: string;
  price: number;
}

Topping {
  name: string;
  type: ToppingType;
  price: number;
}

Pizza {
  toppings: Topping[];
  size: Size;
  quantity: number;
}

ToppingType {
  NonVeg = 0,
  Veg = 1
}

# Screenshot
+/- quantity buttons were also added to showcase the scenario for Offer 2.
![image](https://github.com/user-attachments/assets/e79f8617-4e65-4f6c-9600-751add94664d)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

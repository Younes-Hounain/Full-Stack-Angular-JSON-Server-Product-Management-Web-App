import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, ReactiveFormsModule, FormsModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  actions : Array<any> = [
    {title: 'Home', route:"/home", icon: 'house'},
    {title: 'Products', route:"/products", icon: 'search'},
    {title: 'New Product', route:"/newProduct", icon: 'safe'},
  ]
  currentAction: any;

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}

import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-app-errors',
  standalone: true,
  imports: [
    JsonPipe
  ],
  templateUrl: './app-errors.component.html',
  styleUrl: './app-errors.component.css'
})
export class AppErrorsComponent {
  constructor(public appState:AppStateService){

  }

}

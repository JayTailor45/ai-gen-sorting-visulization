import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {SortingVisualizationComponent} from "./sorting-visualization/sorting-visualization.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SortingVisualizationComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'sorting-visualization';
}

import { Component, OnInit } from '@angular/core';
import { SortingService } from '../sorting.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sorting-visualization',
  templateUrl: './sorting-visualization.component.html',
  styleUrls: ['./sorting-visualization.component.css'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class SortingVisualizationComponent implements OnInit {
  array: number[] = [];
  sortedArray: number[] = [];
  animationSteps: number[][] = [];
  currentStep: number = 0;

  constructor(private sortingService: SortingService) { }

  ngOnInit(): void {
    this.generateRandomArray(10);
    this.sortedArray = this.array.slice();
  }

  generateRandomArray(size: number): void {
    this.array = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  }

  animateMergeSort(): void {
    this.animationSteps = [];
    this.sortedArray = this.sortingService.mergeSort(this.array);
    this.generateAnimationSteps(this.array);
    this.currentStep = 0;
    this.playAnimation();
  }

  generateAnimationSteps(array: number[]): void {
    this.animationSteps.push([...array]); // Initial state

    const mergeSortWithSteps = (arr: number[]) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = mergeSortWithSteps(arr.slice(0, mid));
      const right = mergeSortWithSteps(arr.slice(mid));

      return this.mergeWithSteps(left, right);
    };

    mergeSortWithSteps(array);
  }

  private mergeWithSteps(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      this.animationSteps.push([...result, ...left.slice(leftIndex), ...right.slice(rightIndex)]);
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  playAnimation(): void {
    const interval = setInterval(() => {
      if (this.currentStep < this.animationSteps.length) {
        this.array = this.animationSteps[this.currentStep];
        this.currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 500); // Adjust the speed of the animation here
  }
}

import { IFood } from './../interfaces/food';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  @Input() food!: IFood;
  @HostBinding('style.transform') transform: any;
  constructor() { }

  ngOnInit(): void {
    this.transform = `translate(${this.food.x}px,${this.food.y}px)`;
  }

}

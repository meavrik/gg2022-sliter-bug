import { IFood } from './interfaces/food';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

const basicDelay = 20;
const allFoods = [
  { symbol: 'ð', points: 10, speed: basicDelay, type: 'food' },
  { symbol: 'ð­', points: 50, speed: basicDelay, type: 'food' },
  { symbol: 'ð', points: 100, speed: basicDelay, type: 'food' },
  { symbol: 'ð', points: 30, speed: basicDelay, type: 'food' },
  { symbol: 'ðĄ', points: -10, speed: basicDelay, type: 'change' },
  { symbol: 'ð', points: 100, speed: basicDelay, type: 'change' },
  { symbol: 'ðĪŠ', points: 1, speed: basicDelay / 2, type: 'change' },
  { symbol: 'ðĪ', points: 1000, speed: basicDelay, type: 'change' },
  { symbol: 'ðĨš', points: 0.1, speed: basicDelay * 2, type: 'change' },
  { symbol: 'ðĨķ', points: 20, speed: basicDelay * 4, type: 'change' },
  { symbol: 'ðą', points: 10, speed: basicDelay / 4, type: 'change' },
  { symbol: 'ðĢ', points: 0, speed: basicDelay, type: 'bomb' },
  { symbol: 'ðđ', points: 300, speed: basicDelay, type: 'change' },
  { symbol: 'ðū', points: 666, speed: basicDelay, type: 'change' },
]

@Injectable({
  providedIn: 'root'
})
export class GameEngineService {

  boardSize = { width: 3000, height: 2000 };
  readonly gameOver$ = new Subject<void>();
  readonly newGame$ = new Subject<void>();
  readonly boardSize$ = new BehaviorSubject(this.boardSize)
  readonly apples$ = new BehaviorSubject<IFood[]>([])
  readonly snakeColor$ = new BehaviorSubject<string>('blue');

  constructor() { }

  initFood() {
    this.apples$.next(new Array(15).fill({}).map(a => this.getNewFood()));
  }

  addNewFood() {
    if (this.apples$.getValue().length < 50) {
      this.apples$.next([...this.apples$.getValue(), this.getNewFood()])
    }
  }

  setColor(color: string) {
    this.snakeColor$.next(color)
  }

  removeFood(food: IFood) {
    this.apples$.next(this.apples$.getValue().filter(a => !(a.x === food.x && a.y === food.y)));
  }

  getNewFood(): IFood {
    const randomFood = allFoods[Math.floor(Math.random() * allFoods.length)];
    return Object.assign({}, randomFood, {
      x: Math.round(Math.random() * (this.boardSize.width - 10)) + 10,
      y: Math.round(Math.random() * (this.boardSize.height - 10)) + 10
    }) as IFood;
  }

  gameOver() {
    this.gameOver$.next();
  }

  newGame() {
    this.newGame$.next();
  }
}



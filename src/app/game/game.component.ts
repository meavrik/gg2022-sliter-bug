import { GameEngineService } from './game-engine.service';
import { Component, OnInit, HostBinding, ElementRef } from '@angular/core';
import { filter, interval, map, Subscription } from 'rxjs';
import { IFood } from './interfaces/food';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  testLocation = { x: 50, y: 50 };
  readonly apples$ = this.gameEngine.apples$.pipe(filter(a => !!a));
  intervalVal!: Subscription;
  angryInterval!: Subscription;
  gameOver!: boolean;
  _score: number = 0;
  hiScore: number = 0;
  hungry: number = 100;

  @HostBinding("style.width") widthStr = this.gameEngine.boardSize$.pipe(map(size => `${size.width}px`))
  @HostBinding("style.height") heightStr = this.gameEngine.boardSize$.pipe(map(size => `${size.height}px`))
  @HostBinding('class.glitch') glitch = false;

  constructor(private gameEngine: GameEngineService, public elementRef: ElementRef) { }

  get score() {
    return this._score
  }

  set score(value: number) {
    this._score = value;
    this.hiScore = Math.max(this.hiScore, value);
    const num = localStorage.getItem('score') || 0
    if (this.hiScore > num) {
      localStorage.setItem('score', value.toString());
    }

  }

  ngOnInit() {
    const num = localStorage.getItem('score')
    this.hiScore = +(num || 0);
    // this.startNewGame();

    this.gameEngine.newGame$.subscribe(_ => {
      this.startNewGame();
    })

    this.gameEngine.gameOver$.subscribe(_ => {
      this.gameOver = true;
      this.angryInterval.unsubscribe();
      this.intervalVal.unsubscribe();
    })
  }

  startNewGame() {
    this.gameOver = false;
    this.hungry = 100;
    this.score = 0;
    this.gameEngine.initFood();

    this.angryInterval = interval(100).subscribe(a => {
      this.hungry--;
      if (this.hungry <= 0) {
        this.gameEngine.gameOver();
      }
    })

    this.intervalVal = interval(2000).subscribe(a => {

      // this.apples.push(this.addNewFood())
      this.gameEngine.addNewFood();
    })
  }

  onEat(food: IFood) {
    this.hungry = 100;
    this.score += food.points;
    this.glitch = food.symbol === '👾';
  }

}

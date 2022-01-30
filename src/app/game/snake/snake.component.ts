import { GameEngineService } from './../game-engine.service';
import { IFood } from './../interfaces/food';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit, OnChanges {
  @HostListener('document:keydown', ["$event"]) onkey(event: KeyboardEvent) {
    switch (event.code) {
      case 'ArrowDown':
        this.gotoLocation = Object.assign(this.gotoLocation, { y: this.boardSize.height });
        break;
      case 'ArrowUp':
        this.gotoLocation = Object.assign(this.gotoLocation, { y: 0 });
        break;
      case 'ArrowLeft':
        this.gotoLocation = Object.assign(this.gotoLocation, { x: 0 });
        break;
      case 'ArrowRight':
        this.gotoLocation = Object.assign(this.gotoLocation, { x: this.boardSize.width });
        break;
    }
  }
  gotoLocation: { x: number, y: number } = { x: 100, y: 0 };
  @HostListener('document:mousemove', ["$event"]) onmousemove(event: MouseEvent) {
    this.gotoLocation = {
      x: this.crazyMode ? event.pageY : event.pageX,
      y: this.crazyMode ? event.pageX : event.pageY
    };
    this.lastDirection = null;
    this.stuck = false;
  }

  crazyMode = false;
  head = '';
  lastFace = '';
  gotPoints = 0;
  parts: any[] = [];
  moveArr: any[] = [];
  snakeTransform: any;
  boardSize: { width: number, height: number } = {
    width: this.gameEngine.boardSize.width,
    height: this.gameEngine.boardSize.height
  }

  private _currentLocation: { x: number, y: number } = { x: 0, y: 0 }

  @Input() hungry!: number;

  set currentLocation(value) {
    this._currentLocation = value;
    // this.onmove.emit(value);

    window.scrollTo(
      Math.max(0, value.x - window.innerWidth / 2),
      Math.max(0, value.y - window.innerHeight / 2))
  }

  get currentLocation(): { x: number, y: number } {
    return this._currentLocation;
  }

  @Input() apples: IFood[] = [];
  @Output() eat = new EventEmitter<IFood>();
  @Output() onmove = new EventEmitter<{ x: number, y: number }>();

  constructor(private gameEngine: GameEngineService, private elementRef: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    const hungry = changes['hungry']?.currentValue

    if (hungry === 0) {
      this.head = '😵'
    } else if (hungry) {
      if (hungry < 30) {
        this.head = '😵‍💫'
      } else
        if (hungry < 50) {
          this.head = '🤤'
        } else {
          this.head = this.lastFace;
        }
    }

  }

  lastDirection: { x: number, y: number } | null = null;
  stuck = false;
  intervalVal!: Subscription;

  ngOnInit() {
    this.gameEngine.gameOver$.subscribe(a => {
      this.intervalVal.unsubscribe();
    });

    this.gameEngine.newGame$.subscribe(_ => {
      this.activate();
    });

    this.activate();
  }

  activate() {
    this.parts = new Array(30).map(a => { })
    this.currentLocation = { x: this.gameEngine.boardSize.width / 2, y: 0 }
    this.head = ''
    this.setInterval();
  }

  setInterval(delay = 20) {
    const step = 5;
    if (this.intervalVal) {
      this.intervalVal.unsubscribe()
    }

    this.intervalVal = interval(delay).subscribe(a => {
      if ((this.currentLocation.x > (this.gotoLocation.x - 20) && this.currentLocation.x < (this.gotoLocation.x + 20) &&
        this.currentLocation.y > (this.gotoLocation.y - 20) && this.currentLocation.y < (this.gotoLocation.y + 20))) {

        if (Math.abs(this.currentLocation.x - this.gotoLocation.x) > Math.abs(this.currentLocation.y - this.gotoLocation.y)) {
          if (this.currentLocation.x > this.gotoLocation.x) {
            this.gotoLocation = { x: 0, y: this.gotoLocation.y }
          }

          if (this.currentLocation.x < this.gotoLocation.x) {
            this.gotoLocation = { x: this.boardSize.width + 10, y: this.gotoLocation.y }
          }
        } else {
          if (this.currentLocation.y > (this.gotoLocation.y)) {
            this.gotoLocation = { x: this.gotoLocation.x, y: 0 }
          }

          if (this.currentLocation.y < (this.gotoLocation.y)) {
            this.gotoLocation = { x: this.gotoLocation.x, y: this.boardSize.height + 10 }
          }
        }
      }

      /* if (this.stuck && this.lastDirection) {
        this.currentLocation.x += this.lastDirection.x;
        this.currentLocation.y += this.lastDirection.y;
      } else { */
      this.lastDirection = { x: 0, y: 0 };
      if (this.gotoLocation.x > this.currentLocation.x) {
        this.currentLocation.x += step;
      } else {
        this.currentLocation.x -= step;
      }

      this.lastDirection.x = this.gotoLocation.x - this.currentLocation.x;
      this.lastDirection.y = this.gotoLocation.y - this.currentLocation.y;

      if (this.gotoLocation.y > this.currentLocation.y) {
        this.currentLocation.y += step;
      } else {
        this.currentLocation.y -= step;
      }
      // }

      /* if (this.currentLocation.x > this.boardSize.width) {
        this.currentLocation.x = 0;
      }

      if (this.currentLocation.y > this.boardSize.height) {
        this.currentLocation.y = 0;
      }

      if (this.currentLocation.x < 0) {
        this.currentLocation.x = this.boardSize.width;
      }

      if (this.currentLocation.y < 0) {
        this.currentLocation.y = this.boardSize.height;
      } */

      this.snakeTransform = `translate(${this.currentLocation.x}px , ${this.currentLocation.y}px)`;

      const hitArea = 30;
      this.apples.forEach(food => {
        if (this.currentLocation.x > (food.x - hitArea) && this.currentLocation.x < (food.x + hitArea) &&
          this.currentLocation.y > (food.y - hitArea) && this.currentLocation.y < (food.y + hitArea)) {
          this.onEatSymbol(food);
        }
      })

      this.moveArr.unshift(this.snakeTransform);
      if (this.moveArr.length > this.parts.length) {
        this.moveArr.pop();
      }

      this.currentLocation = Object.assign({}, this.currentLocation)
    })
  }

  onEatSymbol(food: IFood) {
    this.gameEngine.removeFood(food);

    if (food.type === 'bomb') {
      this.head = '💥';
      this.gameOver();
    } else {
      this.gotPoints = food.points;

      setTimeout(() => {
        this.gotPoints = 0;
      }, 2000);
      this.parts = [...this.parts, {}, {}, {}, {}, {}]
      this.eat.emit(food);

      this.crazyMode = false;
      if (food.type !== 'food') {
        // this.head = food.symbol === '💣' ? '💥' : food.symbol;
        this.lastFace = food.symbol;
        this.head = food.symbol;
      }

      this.crazyMode = food.type === 'crazy';
      this.setInterval(food.speed);
    }
  }

  gameOver() {
    this.gameEngine.gameOver();
  }
}

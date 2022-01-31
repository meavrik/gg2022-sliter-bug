import { Component, OnInit } from '@angular/core';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.scss']
})
export class WelcomeScreenComponent implements OnInit {
  selected = 0;
  colors = ['green', 'blue', 'red']
  constructor(private gameEngine: GameEngineService) { }

  ngOnInit(): void {
  }

  onSelect(num: number) {

    this.gameEngine.setColor(this.colors[num])
    this.selected = num
  }

  startNewGame() {
    this.gameEngine.newGame();
  }

}

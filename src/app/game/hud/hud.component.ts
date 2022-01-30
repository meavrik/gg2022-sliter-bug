import { Component, Input, OnInit } from '@angular/core';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-hud',
  templateUrl: './hud.component.html',
  styleUrls: ['./hud.component.scss']
})
export class HudComponent implements OnInit {
  @Input() score: number = 0;
  @Input() hiScore: number = 0;
  @Input() hungry: number = 0;
  @Input() gameOver = false;

  constructor(private gameEngine: GameEngineService) { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.gameEngine.newGame();
  }

}

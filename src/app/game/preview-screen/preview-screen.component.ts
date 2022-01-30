import { Component, HostBinding, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { GameEngineService } from '../game-engine.service';

@Component({
  selector: 'app-preview-screen',
  templateUrl: './preview-screen.component.html',
  styleUrls: ['./preview-screen.component.scss']
})
export class PreviewScreenComponent implements OnInit {

  // readonly apples$ = this.gameEngine.apples$.pipe(map(apples => apples.map(a => Object.assign({}, a, { x: a.x / 10, y: a.y / 10 }))))
  readonly apples$ = this.gameEngine.apples$;

  @HostBinding('style.width') width = '0';
  @HostBinding('style.height') height = '0';

  constructor(private gameEngine: GameEngineService) { }

  ngOnInit() {
    this.gameEngine.boardSize$.subscribe(size => {
      this.width = `${size.width / 15}px`;
      this.height = `${size.height / 15}px`;
    })

  }

}

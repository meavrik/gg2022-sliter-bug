import { SnakePartComponent } from './game/snake/snake-part/snake-part.component';
import { SnakeComponent } from './game/snake/snake.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { FoodComponent } from './game/food/food.component';
import { HudComponent } from './game/hud/hud.component';
import { PreviewScreenComponent } from './game/preview-screen/preview-screen.component';
import { WelcomeScreenComponent } from './game/welcome-screen/welcome-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SnakeComponent,
    SnakePartComponent,
    FoodComponent,
    HudComponent,
    PreviewScreenComponent,
    WelcomeScreenComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

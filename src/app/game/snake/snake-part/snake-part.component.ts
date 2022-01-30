import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-snake-part',
  templateUrl: './snake-part.component.html',
  styleUrls: ['./snake-part.component.scss']
})
export class SnakePartComponent implements OnInit {
  @Input() @HostBinding('style.transform') transform: any
  @Input() @HostBinding('class.body') index: number = 0;
  @Input() type: string = '';
  @Input() points: number = 0;
  @HostBinding('style.zIndex') zIndex: number = 0;
  @HostBinding('class.odd') isOdd = false;
  constructor() { }

  ngOnInit() {
    this.zIndex = 1000 - this.index;
    this.isOdd = !!(this.index % 2);
  }

}

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SnakeComponent } from './snake.component';

describe('SnakeComponent', () => {
  let component: SnakeComponent;
  let fixture: ComponentFixture<SnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

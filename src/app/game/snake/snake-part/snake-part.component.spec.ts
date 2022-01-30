/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SnakePartComponent } from './snake-part.component';

describe('SnakePartComponent', () => {
  let component: SnakePartComponent;
  let fixture: ComponentFixture<SnakePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

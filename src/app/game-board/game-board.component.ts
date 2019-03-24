import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, sequence } from "@angular/animations";


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  animations: [
    trigger('gameState', [
      // state('spin', style({
      //   background: 'yellow',
      //   transform: 'rotateY(360deg) rotateZ(360deg)',
      // })),
      state('pending', style({ background: '{{ color }}' }), {params: {color: '#C1732A'}}),
      state('start', style({ background: '{{ color }}' }), {params: {color: '#46B0A6'}}),
      transition('* => *', animate('300ms ease-out')),
    ]),
    trigger('resultState', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1, transform: 'translateX(100px)' })),
      transition('hide => show', animate('1000ms ease-in-out')),
    ])
  ]
})
export class GameBoardComponent implements OnInit {
  colorCode: string;
  gameState: string = 'pending';
  startingText: string = 'Click to start testing your reaction!!!';
  playingText: string = 'Touch the board as quickly as possible when the color changes!';
  gameStart: boolean = false;
  gameEnd: boolean = false;
  startTime: number;
  endTime: number;
  constructor() { }

  ngOnInit() {
    this.randomColorCode();
  }

  get showingText() {
    return this.gameEnd === true ? 'Game Ended!!!' : this.gameStart === false ? this.startingText : this.playingText;
  }

  get state() {
    return this.gameState;
  }

  get resultState() {
    return this.gameEnd === false ? 'hide' : 'show';
  }

  /* starts game */
  start() {
    if(this.gameEnd) {
      return;
    }
    if (this.gameStart === false) {
      this.gameStart = true;
      console.log(this.startTime);
      this.play();
    } else {
      // prevents clicks before background is changed
      if(this.gameState === 'start')
        this.stop();
    }

  }
  /* stops game */
  stop() {
    this.gameStart = false;
    this.endTime = Date.now() - this.startTime;
    console.log('Total time:', this.endTime);
    this.gameEnd = true;
  }

  /* Resets game */
  reset() {
    this.gameEnd = false;
    this.gameState = 'pending';
    this.randomColorCode();
  }

  /* Generate random number from 3 to 8 */
  randomTime() {
    return Math.floor((Math.random() * 6) + 3);
  }
  /* Generate random color code*/
  randomColorCode() {
    const newCode = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
  }

  play() {
    return new Promise(() => {
      setTimeout(() => {
        this.randomColorCode();
        this.gameState = this.gameState === 'pending' ? 'start' : 'pending';
        this.startTime = Date.now();
      }, this.randomTime() * 500);
    })

  }

}

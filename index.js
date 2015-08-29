'use strict';

import ChessTimer from "./imports/ChessTimer.js";
import React from 'react';

class TimerDisplay extends React.Component{

    constructor(props) {
        super();
        this.state = {
            seed: props.seed,
            interval: props.interval,
            timer: new ChessTimer(props.seed, props.interval)
        };

        //Bind non-React methods to TimerDisplay class
        this.startBlack = this.startBlack.bind(this);
        this.startWhite = this.startWhite.bind(this);
        this.reset = this.reset.bind(this);
    }

    startBlack() {
        this.state.timer.startTimer("BLACK");
    }

    startWhite() {
        this.state.timer.startTimer("WHITE");
    }

    reset() {
        this.state.timer.resetTimers();
    }

    format(currentTime) {
        var milliseconds = (currentTime % 1000 / 10),
            seconds      = Math.floor((currentTime / 1000) % 60),
            minutes      = Math.floor((currentTime / 1000) / 60);

        //Add zero padding to milliseconds/seconds if necessary
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 10 ? milliseconds += "0" : milliseconds;

        return minutes + ":" + seconds + "." + milliseconds;
    }

    render() {
        var blackTime = this.format(this.state.timer.getBlackTime),
            whiteTime = this.format(this.state.timer.getWhiteTime);

        return  <div id="chess-timer">
                    <section id="black-timer-container">
                        <label>{blackTime}</label>
                        <button onClick={this.startBlack}>Start Black</button>
                    </section>
                    <section id="white-timer-container">
                        <label>{whiteTime}</label>
                        <button onClick={this.startWhite}>Start White</button>
                    </section>
                    <section id="reset-container">
                        <button onClick={this.reset}>Reset</button>
                    </section>
                </div>;
    }
}

TimerDisplay.propTypes = {
    seed :    React.PropTypes.number,
    interval: React.PropTypes.number
}

TimerDisplay.defaultProps = {
    seed: 240000,
    interval: 10
}

setInterval(() => {
  React.render(
    <TimerDisplay/>,
    document.getElementById('container')
  );
}, 10);

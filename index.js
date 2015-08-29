'use strict';

import ChessTimer from "./imports/ChessTimer.js";
import React from 'react';

/**
 * TimerDisplay Class
 * @param {number} seed - Value representing initial timer values in ms
 * @param {number} interval - Value representing time to decrement timer
 * @extends React.Component
 */
class TimerDisplay extends React.Component{
    /**
     * TimerDisplay
     * @param props - Variable properties set as Component attributes
     */
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

    /**
     * Function to start the black timer, pauses white if applicable
     */
    startBlack() {
        this.state.timer.startTimer("BLACK");
    }

    /**
     * Function to start the white timer, pauses black if applicable
     */
    startWhite() {
        this.state.timer.startTimer("WHITE");
    }

    /**
     * Function to reset the timer values
     */
    reset() {
        this.state.timer.resetTimers();
    }

    /**
     * Function to format the timer display as HH:mm:ss
     * @param {number} currentTime - Current timer value in ms
     * @returns {string} - Returns current time in HH:mm:ss
     */
    format(currentTime) {
        var milliseconds = (currentTime % 1000 / 10),
            seconds      = Math.floor((currentTime / 1000) % 60),
            minutes      = Math.floor((currentTime / 1000) / 60);

        //Add zero padding to milliseconds/seconds if necessary
        seconds = seconds < 10 ? "0" + seconds : seconds;
        milliseconds = milliseconds < 10 ? milliseconds += "0" : milliseconds;

        return minutes + ":" + seconds + "." + milliseconds;
    }

    /***
     * Render the React component
     * @returns {XML}
     */
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

/**
 * Set types for ChessTimer properties
 */
TimerDisplay.propTypes = {
    seed :    React.PropTypes.number,
    interval: React.PropTypes.number
}

/**
 * Sets default ChessTimer properties
 * @type {{seed: number, interval: number}}
 */
TimerDisplay.defaultProps = {
    seed: 240000,
    interval: 10
}

/**
 * Set interval to re-render component every 10 ms
 */
setInterval(() => {
  React.render(
    <TimerDisplay/>,
    document.getElementById('container')
  );
}, 10);

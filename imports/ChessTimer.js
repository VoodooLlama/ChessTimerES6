'use strict';
import Timer from "./Timer";

/**
 * Constant representing Chess Timer State
 * @type {{0: string, 1: string, 2: string}}
 */
const STATE = {
    0: 'OFF',
    1: 'BLACK',
    2: 'WHITE'
};

/**
 * ChessTimer Class
 * @param {number} seed - Initial timer values
 * @param {number} interval - Interval at which to decrement timers
 */
class ChessTimer {
    /**
     * ChessTimer Constructor
     * @param seed
     * @param interval
     */
    constructor(seed, interval) {
        this._seed = seed;
        this._interval = interval;
        this._currentState = STATE[0];
        this._blackTimer = new Timer(this._seed, this._interval);
        this._whiteTimer = new Timer(this._seed, this._interval);
        this._winIntervalID = null;
    }

    /**
     * Private function to check if the timer has run out
     * @private
     */
    _resetWinInterval()
    {
        clearInterval(this._winIntervalID);
        this._winIntervalID = setInterval(() => {
            switch(this._currentState)
            {
                case STATE[1]:
                    var time = this.getBlackTime;
                    break;
                case STATE[2]:
                    var time = this.getWhiteTime;
            }
            this.validateTimer(time);
        }, this._interval);
    }

    /**
     * Private function to identify
     * @param {number} currTime - Current timer value
     * @private
     */
    validateTimer(currTime)
    {
        if(currTime <= 0)
        {
            switch(this._currentState)
            {
                case STATE[1]:
                    console.log("White Wins!");
                    break;
                case STATE[2]:
                    console.log("Black Wins!");
                    break;
            }
            this.resetTimers();
        }
    }

    /**
     * Function to start either black or white timer
     * @param {string} state - Value representing timer color to start ("BLACK" or "WHITE")
     */
    startTimer(state) {
        if (state !== this._currentState) {
            switch (state) {
                case STATE[1]:
                    this._whiteTimer.pauseTimer();
                    this._blackTimer.startTimer();
                    this._currentState = STATE[1];
                    break;
                case STATE[2]:
                    this._blackTimer.pauseTimer();
                    this._whiteTimer.startTimer();
                    this._currentState = STATE[2];
                    break;
            }
            this._resetWinInterval();
        }
    }

    /**
     * Function to reset timer values
     */
    resetTimers()
    {
        this._blackTimer.resetTimer();
        this._whiteTimer.resetTimer();
        clearInterval(this._winIntervalID);
        this._currentState = STATE[0];
    }

    /**
     * Accessor to return the time of the currently running black timer
     * @returns {ChessTimer._whiteTimer._currentTime}  Time in ms
     */
    get getBlackTime()
    {
        return this._blackTimer.getCurrentTime;
    }

    /**
     * Accessor to return the time of the currently running white timer
     * @returns {ChessTimer._whiteTimer._currentTime} Time in ms
     */
    get getWhiteTime()
    {
        return this._whiteTimer.getCurrentTime;
    }

    /**
     * Accessor to return current timer state
     * @returns {ChessTimer._currentState|*}
     */
    get timerState()
    {
        return this._currentState;
    }
}

/**
 * Export ChessTimer Class
 * @type {ChessTimer}
 */
module.exports = ChessTimer;

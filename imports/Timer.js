'use strict';
/**
 * Generic Countdown Timer Module
 * @param {number} seed - Starting Time (ms)
 * @param {number} interval - Interval at which the timer is decremented
 */
class Timer {
    /**
     * Timer Constructor
     * @param seed
     * @param interval
     */
    constructor(seed, interval)
    {
        this._seed = seed;
        this._interval = interval;
        this._intervalID = null;
        this._currentTime = seed;
    }

    /**
     * Function to start the timer, begin counting down
     */
    startTimer()
    {
        this._intervalID = setInterval(() => {
            this._currentTime -= this._interval;
            if(this._currentTime <= 0)
            {
                clearInterval(this._intervalID);
            }
        }, this._interval);
    }

    /**
     * Function to pause the timer, halt counting down
     */
    pauseTimer() {
        clearInterval(this._intervalID);
    }

    /**
     * Function to reset timer to initial seed value
     */
    resetTimer() {
        clearInterval(this._intervalID);
        this._currentTime = this._seed;
    }

    /**
     * Accessor for Current Time
     * @returns {number} Current Time
     */
    get getCurrentTime () {
        return this._currentTime;
    }
}

/**
 * Export Timer Class
 * @type {Timer}
 */
module.exports = Timer;
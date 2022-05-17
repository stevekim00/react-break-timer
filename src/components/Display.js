import React from 'react';

const Display = props => {
    const secondsToTime = secs => {
        let minutes = Math.floor(secs/60);
        let remainingSecs = secs % 60;
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (remainingSecs < 10) {
            remainingSecs = "0" + remainingSecs;
        }
        return minutes + ":" + remainingSecs;
    }
    const displayTime = secondsToTime(props.time);
    return ( 
      <div>
        <h2 id="timer-label">{props.mode}</h2>
        <div id="time-left">{displayTime}</div>  
      </div>
    );
};

export default Display;
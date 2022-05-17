import React from 'react';

const ControlButtons = props => {
    return (
        <div id="active-timer-buttons">
        <div id='start_stop' onClick={props.handleStartStop}>
            <i className="large play icon" />
            <i className="large pause icon" />
        </div>
        <i id="reset" onClick={props.handleReset} className="large undo icon"></i>
        </div>
    );
}

export default ControlButtons;
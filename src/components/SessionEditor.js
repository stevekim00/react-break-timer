import React from 'react';

const SessionEditor = props => {
    return (
        <div id="session-editor" className="timer ui center aligned">
        <h2 id="session-label">Session Length</h2>
        <div className="timer-buttons">
            <i id="session-decrement" onClick={props.reduceSessionLength} className="large arrow down icon"></i>
            <div className="editor-time">
            <h2 id="session-length">{props.sessionLength}</h2>
            </div>
            <i id="session-increment" onClick={props.addSessionLength} className="large arrow up icon"></i>
        </div>
        </div>
    );
};

export default SessionEditor;
import React from 'react';

const BreakEditor = props => {
    return (
      <div id="break-editor" className="timer ui center aligned">
        <h2 id="break-label">Break Length</h2>
        <div className="timer-buttons">
          <i id="break-decrement" onClick={props.reduceBreakLength} className="large arrow down icon"></i>
          <div className="editor-time">
            <h2 id="break-length">{props.breakLength}</h2>
          </div>
          <i id="break-increment" onClick={props.addBreakLength} className="large arrow up icon"></i>
        </div>
      </div>
    );
  };

export default BreakEditor;
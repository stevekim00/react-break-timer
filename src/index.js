import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import BreakEditor from './components/BreakEditor';
import SessionEditor from './components/SessionEditor';
import Display from './components/Display';
import ControlButtons from './components/ControlButtons';
  
const App = () => {
  const [time, setTime] = useState(1500);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState('Session');
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  
  const timeRef = useRef(time);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  
  const tick = () => {
    timeRef.current--;
    setTime(timeRef.current);
  }
  
  const beep = document.getElementById("beep");
  
  useEffect(() => {
    const switchMode = () => {
      beep.play();
      
      const nextMode = modeRef.current === 'Session' ? 'Break' : 'Session';
      const nextTime = (nextMode === 'Session' ? sessionLength : breakLength) * 60;
      
      console.log(nextMode + ", " + nextTime);
      
      setMode(nextMode);
      modeRef.current = nextMode;
      
      setTime(nextTime);
      timeRef.current = nextTime;
    }
    
    setTime(timeRef.current);
    
    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (timeRef.current === 0) {
        return switchMode();
      }
      tick();
    }, 1000);
    
    return () => clearInterval(interval);
    
  }, [isPaused]);
  
  const handleStartStop = () => {
    console.log('clicked');
    if (isPaused) {
      setIsPaused(false);
      isPausedRef.current = false;
    }
    if (!isPaused) {
      setIsPaused(true);
      isPausedRef.current = true;
    }
  }
  
  const handleReset = () => {
    setTime(1500);
    timeRef.current = 1500;
    setIsPaused(true);
    isPausedRef.current = true;
    setBreakLength(5);
    setSessionLength(25);
    setMode('Session');
    modeRef.current = 'Session';
    beep.pause();
    beep.currentTime = 0;
  }
  
  const addSessionLength = () => {
    if (sessionLength < 60 && isPaused){
      setSessionLength(sessionLength + 1);
    }
    if (sessionLength < 60 && isPaused && mode === "Session"){
      setTime((sessionLength + 1) * 60)
      timeRef.current = (sessionLength + 1) * 60;
    }
  }
  
  const reduceSessionLength = () => {
    if (sessionLength > 1 && isPaused){
      setSessionLength(sessionLength - 1);
    }
    if (sessionLength > 1 && isPaused && mode === "Session"){
      setTime((sessionLength - 1) * 60);
      timeRef.current = (sessionLength - 1) * 60;
    }
  }
  
  const addBreakLength = () => {
    if (breakLength < 60 && isPaused){
      setBreakLength(breakLength + 1);
    }
    if (breakLength < 60 && isPaused && mode === "Break"){
      setTime((breakLength + 1) * 60);
      timeRef.current = (breakLength + 1) * 60;
    }
  }
  
  const reduceBreakLength = () => {
    if (breakLength > 1 && isPaused){
      setBreakLength(breakLength - 1);
    }
    if (breakLength > 1 && isPaused && mode === "Break"){
      setTime((breakLength - 1) * 60);
      timeRef.current = (breakLength - 1) * 60;
    }
  }
  
  return (
    <div id="app-container" className="ui center aligned container">
      <h1 className="app-header">Break Timer</h1>
      <div className="editor-container">
        <BreakEditor 
          breakLength={breakLength} 
          addBreakLength={() => addBreakLength()} 
          reduceBreakLength={() => reduceBreakLength()} 
        />
        <SessionEditor 
          sessionLength={sessionLength} 
          addSessionLength={() => addSessionLength()} 
          reduceSessionLength={() => reduceSessionLength()} 
        />
      </div>
      <div id="active-timer" className="timer ui center aligned container">
        <Display
          time={time}
          mode={mode} 
        />
        <ControlButtons
          handleStartStop={handleStartStop}
          handleReset={handleReset}
        />
      </div>
      <audio id="beep" src="https://sampleswap.org/samples-ghost/MELODIC%20LOOPS/HORN%20LOOPS/462[kb]179_acid-trumpet-bebop-down.wav.mp3" />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));
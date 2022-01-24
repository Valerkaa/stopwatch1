import React, { useEffect, useState } from 'react';
import {interval, Subject,} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import './App.css';

function App() {
    const [time, setTime] = useState(0);
    const [isTimerOn, setTimerOn,prevClickTime,setPrevClickTime] = useState(false);
    const [startStopBtn, setStartStopBtn] = useState();
        //const clickTime = Date.now();
        //const delay = clickTime - prevClickTime;
    const handleClick = () => {
        setTimerOn(!isTimerOn);
         setTime(0);
    };


    const handleWait = () => {
            //setPrevClickTime(clickTime);
            //if (delay >= 300) {
             // return;
           // }
        if (time !== 0) {
            setTimerOn(false);
        }
    }
    const handleReset = () => {
        setTime(0);
        setTimerOn(true);
    };

    useEffect(() => {
        if (isTimerOn) {
            setStartStopBtn('Stop');
        } else {
            setStartStopBtn('Start');
        }

        const timeSubject$ = new Subject();
        interval(1000)
            .pipe(takeUntil(timeSubject$))
            .subscribe(() => {
                if (isTimerOn) {
                    setTime((val) => val + 1);
                }
            });

        return () => {
            timeSubject$.next();
            timeSubject$.complete();
        };
    }, [isTimerOn]);
    return (
        <section className="main">
            <div className="clock">
                <h1>Timer</h1>
                <div className="timer__wrapper">
                    <div className="case">

                        <div className="clock">{(time / 3600) < 10 && <span>0</span>}{Math.trunc(time / 3600)}</div>
                        <div className="clock">:</div>
                        <div className="clock">{(time / 60) < 10 && <span>0</span>}{Math.trunc(time / 60) % 60}
                        </div>
                        <div className="clock">:</div>
                        <div className="clock">{(time % 60) < 10 && <span>0</span>}{time % 60}</div>
                    </div>
                    <div className="case">
                        <button className={isTimerOn ? 'stop' : ''} onClick={handleClick} id="start-stop">{startStopBtn}</button>
                        <button className="wait" onDoubleClickCapture={handleWait} id="wait">Wait</button>
                        <button className="reset" onClick={handleReset}>Reset</button>
                    </div>

                </div>
            </div>
        </section>
    );
}
export default App;

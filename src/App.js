import React, { useEffect, useState } from 'react';
import {interval, Subject, buffer, debounceTime, filter,map,} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import './App.css';
function App() {
    const [time, setTime] = useState(0);
    const [isTimerOn, setTimerOn] = useState(false);
    const handleClick = () => {
        setTimerOn(!isTimerOn);
         setTime(0);
    };
    const handleClickStop = () => {
        setTimerOn(!isTimerOn);
        setTime(0);
    };
    const handleWait = () => {
        waitClick$.next();
    }
    const waitClick$ = new Subject()

    waitClick$.pipe(
        buffer(waitClick$.pipe(debounceTime(300))),
        map(item => item.length),
        filter(item => item === 2),
    ).subscribe(() => {
        setTimerOn(false);;
    })

    const handleReset = () => {
        setTime(0);
        setTimerOn(true);
    };

    useEffect(() => {
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
                        <button className="start" onClick={handleClick}>Start</button>
                        <button className="stop" onClick={handleClickStop}>Stop</button>
                        <button className="wait" onClick={handleWait}  id="wait">Wait</button>
                        <button className="reset" onClick={handleReset}>Reset</button>
                    </div>

                </div>
            </div>
        </section>
    );
}
export default App;

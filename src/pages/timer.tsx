import settings from "../settings";
import { Timer as ITimer } from "../types";
import { addMinutes, addSeconds } from "date-fns";
import Countdown from "react-countdown";
import React from "react";
import Generator from "../components/Generator";
import useCounter from "../hooks/useCounter";

interface Props {}

const setTimerText = ({ minutes, seconds }: ITimer) => {
  if (minutes < 10 && seconds < 10) return `0${minutes}:0${seconds}`;
  if (minutes < 10) return `0${minutes}:${seconds}`;
  if (seconds < 10) return `${minutes}:0${seconds}`;
  return `${minutes}:${seconds}`;
};

const calculateTimeLeft = ({ minutes, seconds }: ITimer) => {
  const timeNow = Date.now();
  return addSeconds(addMinutes(timeNow, minutes), seconds);
};

const renderer = ({ minutes, seconds, completed, api, props }: any) => {
  if (completed) {
    // Render a completed state
    return <Generator restart={() => api.start()} />;
  } else {
    // Render a countdown
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontSize: "5rem" }}>
          {setTimerText({ minutes, seconds })}
        </h2>
        <button onClick={() => api.start()}>Aloita</button>
      </div>
    );
  }
};

const Timer = (props: Props) => {
  const { count, setCount, increment, reset } = useCounter(0);
  const { timer } = settings;

  if (!timer) return <div>No timer found</div>;

  const countDownTo = calculateTimeLeft(timer);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <Countdown
        key={count}
        date={countDownTo}
        renderer={renderer}
        autoStart={false}
      />
    </div>
  );
};

export default Timer;

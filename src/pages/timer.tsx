import settings from "../settings";
import { Punishment, Timer as ITimer } from "../types";
import { addMinutes, addSeconds } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { Button, Center, Container, Title } from "@mantine/core";
import Generator from "../components/Generator";
interface Props {
  punishments: Punishment[];
}

const setTimerText = (minutes: number, seconds: number) => {
  if (minutes < 10 && seconds < 10) return `0${minutes}:0${seconds}`;
  if (minutes < 10) return `0${minutes}:${seconds}`;
  if (seconds < 10) return `${minutes}:0${seconds}`;
  return `${minutes}:${seconds}`;
};

/* const calculateTimeLeft = ({ minutes, seconds }: ITimer) => {
  const timeNow = Date.now();
  return addSeconds(addMinutes(timeNow, minutes), seconds);
}; */

const useInterval = (callback: any, delay: number | null) => {
  const savedCallback = useRef<any>();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const Timer = ({ punishments }: Props) => {
  //const { minutes, seconds } = settings;
  //const countDownTo = calculateTimeLeft(timer);
  const [unUsedPunishments, setUnUsedPunishments] = useState(punishments);
  const [usedPunishments, setUsedPunishments] = useState([]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  console.log({ unUsedPunishments });
  console.log({ usedPunishments });
  console.log({ timeIsUp });

  useInterval(
    () => {
      if (minutes <= 0 && seconds <= 0) {
        setIsRunning(false);
        setTimeIsUp(true);
      }
      if (seconds <= 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        setSeconds(seconds - 1);
      }
    },
    isRunning ? 1000 : null
  );

  const handleRestart = () => {
    setMinutes(0);
    setSeconds(2);
    setTimeIsUp(false);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {timeIsUp ? (
        <Generator
          usedPunishments={usedPunishments}
          unUsedPunishments={unUsedPunishments}
          restart={handleRestart}
        />
      ) : (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title style={{ fontSize: "10rem" }}>
            {setTimerText(minutes, seconds)}
          </Title>
          {!isRunning && <Button onClick={() => setIsRunning(true)}>Käynnistä</Button>}
          {isRunning && <Button color="red" onClick={() => setIsRunning(false)}>Pysäytä</Button>}
        </Container>
      )}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const punishments = await prisma.punishment.findMany();
  return { props: { punishments } };
};

export default Timer;

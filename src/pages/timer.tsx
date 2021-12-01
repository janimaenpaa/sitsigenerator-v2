import { Punishment, Settings, Timer as ITimer } from "../types";
import React, { useEffect, useRef, useState } from "react";
import { GetServerSideProps, GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { Button, Container, Title } from "@mantine/core";
import Generator from "../components/Generator";
import Link from "next/link";
interface Props {
  punishments: Punishment[];
  settings: Settings;
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

const Timer = ({ punishments, settings }: Props) => {
  //const { minutes, seconds } = settings;
  //const countDownTo = calculateTimeLeft(timer);
  const [unUsedPunishments, setUnUsedPunishments] = useState(punishments);
  const [usedPunishments, setUsedPunishments] = useState([]);
  const [minutes, setMinutes] = useState(settings.minutes);
  const [seconds, setSeconds] = useState(settings.seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);
  const [tables, setTables] = useState(
    Array.from(Array(settings.tables).keys())
  );

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
    setMinutes(settings.minutes);
    setSeconds(settings.seconds);
    setTimeIsUp(false);
  };

  useEffect(() => {
    if (tables.length === 0) {
      setTables(Array.from(Array(settings.tables).keys()));
    }
  }, [tables]);

  return (
    <Container style={{ marginTop: 10 }}>
      <Link href="/" passHref>
        <Button>Takaisin</Button>
      </Link>

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
            settings={settings}
            tables={tables}
            setTables={setTables}
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
            <Title style={{ fontSize: "20vw" }}>
              {setTimerText(minutes, seconds)}
            </Title>
            {!isRunning && (
              <Button onClick={() => setIsRunning(true)}>Käynnistä</Button>
            )}
            {isRunning && (
              <Button color="red" onClick={() => setIsRunning(false)}>
                Pysäytä
              </Button>
            )}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const punishments = await prisma.punishment.findMany();
  const settings = await prisma.settings.findFirst();
  return { props: { punishments, settings } };
};

export default Timer;

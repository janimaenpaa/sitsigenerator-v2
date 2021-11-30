import { Button, Container, Text, Title } from "@mantine/core";
import { useState } from "react";
import useTimeout from "../hooks/useTimeout";
import { Punishment } from "../types";

interface Props {
  usedPunishments: Punishment[];
  unUsedPunishments: Punishment[];
  restart: () => void;
}

const generatePunishment = (punishments: Punishment[]) => {
  const min = 0;
  const max = punishments.length;
  return punishments[Math.floor(Math.random() * (max - min) + min)].description;
};

const PunishmentGenerator = ({
  unUsedPunishments,
  usedPunishments,
  restart,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);

  const stopGenerating = () => {
    setIsGenerating(false);
  };

  useTimeout(stopGenerating, 2000);

  if (isGenerating) return <div>Arvotaan rangaistusta...</div>;

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Title>Rangaistus</Title>
      <Text style={{ margin: 10 }}>
        {generatePunishment(unUsedPunishments)}
      </Text>
      <Button style={{ marginTop: 20 }} onClick={restart}>
        Käynnistä uudelleen
      </Button>
    </Container>
  );
};

export default PunishmentGenerator;

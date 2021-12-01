import { Button, Container, Text, Title } from "@mantine/core";
import { useState } from "react";
import useTimeout from "../hooks/useTimeout";
import { Punishment } from "../types";

interface Props {
  punishments: Punishment[];
  setPunishments: React.Dispatch<React.SetStateAction<Punishment[]>>;
  restart: () => void;
}

const generatePunishment = (punishments: Punishment[]) => {
  return punishments[Math.floor(Math.random() * punishments.length)];
};

const PunishmentGenerator = ({
  setPunishments,
  punishments,
  restart,
}: Props) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [punishment, setPunishment] = useState<Punishment>();

  const stopGenerating = () => {
    const generatedPunishment = generatePunishment(punishments);
    setPunishment(generatedPunishment);
    setPunishments(punishments.filter((p) => generatedPunishment.id !== p.id));
    setIsGenerating(false);
  };

  useTimeout(stopGenerating, 5000);

  console.log({ punishments });

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
      <Text style={{ margin: 10 }}>{punishment?.description}</Text>
      <Button style={{ marginTop: 20 }} onClick={restart}>
        Käynnistä uudelleen
      </Button>
    </Container>
  );
};

export default PunishmentGenerator;

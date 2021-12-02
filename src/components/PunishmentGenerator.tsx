import { Button, Center, Container, Loader, Text, Title } from "@mantine/core";
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

  if (isGenerating)
    return (
      <Center style={{ flexDirection: "column" }}>
        <Loader size={160} />
        <Text style={{ fontSize: "4vw", marginTop: 10 }}>
          Arvotaan rangaistusta...
        </Text>
      </Center>
    );

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
      <Title style={{ margin: 10, fontSize: "6vw", textAlign: "center" }}>
        Rangaistus
      </Title>
      <Text style={{ margin: 10, fontSize: "4vw", textAlign: "center" }}>
        {punishment?.description}
      </Text>
      <Button style={{ marginTop: 20 }} onClick={restart}>
        Käynnistä uudelleen
      </Button>
    </Container>
  );
};

export default PunishmentGenerator;

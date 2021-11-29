import { useEffect, useState } from "react";
import { Punishment } from "../types";
import Link from "next/link";
import { Button, Card, Container, Text, TextInput, Title } from "@mantine/core";

const Settings = () => {
  const [punishment, setPunishment] = useState("");
  const [punishments, setPunishments] = useState<Punishment[] | null>(null);

  const getPunishments = () => {
    fetch("/api/punishments")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setPunishments(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddPunishment = () => {
    fetch("/api/punishments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: punishment }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getPunishments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = (id: number) => {
    fetch(`/api/punishments/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted");
        getPunishments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getPunishments();
  }, []);

  return (
    <Container>
      <Link href="/" passHref>
        <Button mt={20}>Takasin</Button>
      </Link>
      <Container style={{ flexDirection: "column", paddingTop: 10 }}>
        <Title align="center">Asetukset</Title>
        <Title order={2}>Rangaistukset</Title>
        <TextInput
          label="Lisää rangaistus"
          onChange={(event) => setPunishment(event.target.value)}
          value={punishment}
        />
        <Button
          fullWidth
          onClick={handleAddPunishment}
          style={{ marginTop: 10, marginBottom: 20 }}
        >
          Lisää
        </Button>
        {punishments && punishments.length > 0 ? (
          punishments.map((p) => (
            <Card key={p.id} withBorder style={{ marginTop: 10 }}>
              <Text>{p.description}</Text>
              <Button color="red" onClick={() => handleDelete(p.id)}>
                Poista
              </Button>
            </Card>
          ))
        ) : (
          <Card withBorder>Ei rangaistuksia</Card>
        )}
      </Container>
    </Container>
  );
};

export default Settings;

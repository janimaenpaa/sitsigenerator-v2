import { Fragment, useEffect, useState } from "react";
import { Punishment, Settings as ISettings } from "../types";
import Link from "next/link";
import { Button, Card, Container, Text, TextInput, Title } from "@mantine/core";

const Settings = () => {
  const [punishment, setPunishment] = useState("");
  const [tables, setTables] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [punishments, setPunishments] = useState<Punishment[] | null>(null);
  const [settingsData, setSettingsData] = useState<ISettings | null>(null);
  const [loading, setLoading] = useState(true);

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

  const getSettingsData = () => {
    fetch("/api/settings")
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setSettingsData(data);
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
        setPunishment("");
        getPunishments();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateSettingsData = (body: any) => {
    console.log(body);
    fetch("/api/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        getSettingsData();
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

  const handleTables = () => {
    updateSettingsData({ tables: Number(tables) });
  };

  const handleTimer = () => {
    updateSettingsData({ minutes: Number(minutes), seconds: Number(seconds) });
  };

  useEffect(() => {
    Promise.all([getPunishments(), getSettingsData()]).then(() =>
      setLoading(false)
    );
  }, []);

  return (
    <Container>
      <Link href="/" passHref>
        <Button mt={20}>Takasin</Button>
      </Link>
      <Title align="center">Asetukset</Title>
      {loading ? (
        <Container>Loading...</Container>
      ) : (
        <Fragment>
          <Container style={{ flexDirection: "column", paddingTop: 10 }}>
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
          <Container style={{ flexDirection: "column", paddingTop: 10 }}>
            <Title order={2}>Pöytäryhmät</Title>
            <TextInput
              label={`Pöytäryhmien määrä ${settingsData?.tables}`}
              onChange={(event) => setTables(event.target.value)}
              value={tables}
            />
            <Button
              fullWidth
              onClick={handleTables}
              style={{ marginTop: 10, marginBottom: 20 }}
            >
              Muuta
            </Button>
          </Container>
          <Container style={{ flexDirection: "column", paddingTop: 10 }}>
            <Title order={2}>Ajastin</Title>
            <Text>{`${settingsData?.minutes} minuutia, ${settingsData?.seconds} sekuntia`}</Text>
            <Container style={{ width: "100%" }}>
              <TextInput
                label={`Minuutit`}
                onChange={(event) => setMinutes(event.target.value)}
                value={minutes}
              />
              <TextInput
                label={`Sekuntit`}
                onChange={(event) => setSeconds(event.target.value)}
                value={seconds}
              />
            </Container>
            <Button
              fullWidth
              onClick={handleTimer}
              style={{ marginTop: 10, marginBottom: 20 }}
            >
              Muuta
            </Button>
          </Container>
        </Fragment>
      )}
    </Container>
  );
};

export default Settings;

import { GetStaticProps } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { Punishment } from "../types";
import Link from "next/link";
import {
  Button,
  Card,
  Container,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

interface Props {
  punishments: Punishment[];
}

const Settings = ({ punishments }: Props) => {
  console.log({ punishments });
  return (
    <Container>
      <Link href="/" passHref>
        <Button mt={20}>Takasin</Button>
      </Link>
      <Container style={{ flexDirection: "column", paddingTop: 10 }}>
        <Title align="center">Asetukset</Title>
        <Title order={2}>Rangaistukset</Title>
        <TextInput label="Lisää rangaistus" />
        <Button style={{ marginTop: 10, marginBottom: 20 }} fullWidth>
          Lisää
        </Button>
        {punishments.map((p) => (
          <Card key={p.id} withBorder style={{ marginTop: 10 }}>
            <Text>{p.description}</Text>
            <Button color="red">Poista</Button>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const punishments = await prisma.punishment.findMany();
  return { props: { punishments } };
};

export default Settings;

import { GetStaticProps } from "next";
import React from "react";
import prisma from "../lib/prisma";
import { Punishment } from "../types";
import Link from "next/link";

interface Props {
  punishments: Punishment[];
}

const Settings = ({ punishments }: Props) => {
  console.log({ punishments });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Link href="/">Takasin</Link>
      <h2>Settings</h2>
      <ul>
        {punishments.map((p) => (
          <li key={p.id}>{p.description}</li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const punishments = await prisma.punishment.findMany();
  return { props: { punishments } };
};

export default Settings;

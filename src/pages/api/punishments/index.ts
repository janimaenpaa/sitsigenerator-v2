import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nc from "next-connect";

export const addPunishment = async (req: NextApiRequest) => {
  const { description } = req.body;

  const newPunishment = { description };

  try {
    const punishment = await prisma.punishment.create({ data: newPunishment });
    return { data: punishment };
  } catch (error) {
    return { error };
  }
};

export const getPunishments = async () => {
  const posts = await prisma.punishment.findMany();
  return posts;
};

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const punishments = await getPunishments();
    res.json(punishments);
  })
  .post(async (req, res) => {
    const punishment = await addPunishment(req);

    if (punishment.error) {
      return res.status(400).json(punishment);
    }

    res.status(201).json(punishment);
  });

export default handler;

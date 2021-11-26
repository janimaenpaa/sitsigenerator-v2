import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import nc from "next-connect";

export const getPunishmentById = async (id: number) => {
  const punishment = await prisma.punishment.findUnique({
    where: { id: id },
  });

  if (!punishment) return null;

  return punishment;
};

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const id = Number(req.query.id);
    const punishment = await getPunishmentById(id);

    if (!punishment) {
      console.log(punishment);
      res.status(404);
      res.json({ error: "Punishment not found" });
      return;
    }

    res.json(punishment);
  })
  .put(async (req, res) => {
    const id = Number(req.query.id);

    const punishment = await prisma.punishment.findUnique({
      where: { id: id },
    });

    if (!punishment) {
      res.status(404);
      res.json({ error: "Punishment not found" });
      return;
    }

    try {
      const updatedPunishment = await prisma.punishment.update({
        where: { id: id },
        data: { ...req.body },
      });
      res.json(updatedPunishment);
    } catch (error) {
      res.status(400).json({ error });
    }
  })
  .delete(async (req, res) => {
    const id = Number(req.query.id);

    const punishment = await prisma.punishment.findUnique({
      where: { id: id },
    });

    if (!punishment) {
      res.status(404);
      res.json({ error: "punishment not found" });
      return;
    }

    try {
      await prisma.punishment.delete({
        where: { id: id },
      });

      res.json({ message: `punishment deleted` });
    } catch (error) {
      res.json({ error });
    }
  });

export default handler;

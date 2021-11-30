import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import prisma from "../../lib/prisma";

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

export const getSettings = async () => {
  const settings = await prisma.settings.findFirst();
  return settings;
};

const handler = nc<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const settings = await getSettings();
    res.json(settings);
  })
  .put(async (req, res) => {
    const settings = await prisma.settings.findFirst();

    if (!settings) {
      res.status(404);
      res.json({ error: "Settings not found" });
      return;
    }

    try {
      const updatedPunishment = await prisma.settings.update({
        where: { id: settings?.id },
        data: { ...req.body },
      });
      res.json(updatedPunishment);
    } catch (error) {
      res.status(400).json({ error });
    }
  });

export default handler;

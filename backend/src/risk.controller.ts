import { Router } from "express";
import { prisma } from "./prisma";

export const router = Router();

router.post("/", async (req, res) => {
  const { answers, score, result } = req.body;

  try {
    const saved = await prisma.riskAssessment.create({
      data: { answers, score, result },
    });
    res.json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao salvar avaliação" });
  }
});

router.get("/", async (_, res) => {
  const list = await prisma.riskAssessment.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(list);
});

import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { verificarAutenticacao } from "../middlewares/verificar-autenticacao.js";

export const rotasProduto = Router();

rotasProduto.use(verificarAutenticacao);

rotasProduto.post("/produtos", async (req, res) => {
  const data = req.body;

  const product = await prisma.product.create({
    data: {
      ...data,
      dataVencimento: new Date(data.dataVencimento),
    },
  });

  res.status(201).json(product);
});

rotasProduto.get("/produtos", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

rotasProduto.put("/produtos/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (data.dataVencimento) {
    data.dataVencimento = new Date(data.dataVencimento);
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  res.status(200).json(product);
});

rotasProduto.delete("/produtos/:id", async (req, res) => {
  const id = req.params.id;

  await prisma.product.delete({
    where: {
      id,
    },
  });

  res.status(204).send();
});

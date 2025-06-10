import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const rotasUsuario = Router();

rotasUsuario.post("/login", async (req, res) => {
  const data = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return res.status(401).send();
  }

  const verificarSenha = await bcryptjs.compare(req.body.senha, user.senha);

  if (!verificarSenha) {
    return res.status(401).send();
  }

  const token = jwt.sign({}, process.env.JWT, {
    expiresIn: "1d",
  });

  return res.status(200).json({
    token,
    user,
  });
});

rotasUsuario.post("/usuarios", async (req, res) => {
  const isUserexists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: req.body.email,
        },
        {
          cpf: req.body.cpf,
        },
      ],
    },
  });

  console.log(isUserexists);

  if (isUserexists) {
    return res.status(409).send();
  }

  const user = await prisma.user.create({
    data: {
      ...req.body,
      senha: await bcryptjs.hash(req.body.senha, 8),
    },
  });

  res.status(201).json(user);
});

rotasUsuario.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

rotasUsuario.put("/usuarios/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (data.senha) {
    data.senha = await bcryptjs.hash(data.senha, 8);
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      cpf: data.cpf || undefined,
      email: data.email || undefined,
      senha: data.senha || undefined,
      nome: data.nome || undefined,
      tipoUsuario: data.tipoUsuario || undefined,
      fotoPerfil: data.fotoPerfil || undefined,
    },
  });

  res.status(200).json(user);
});

rotasUsuario.delete("/usuarios/:id", async (req, res) => {
  const id = req.params.id;

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(204).send();
});

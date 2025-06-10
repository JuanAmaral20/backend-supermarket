import bcryptjs from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

async function executeSeed() {
  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      senha: await bcryptjs.hash("123456", 8),
      cpf: "123.456.789-09",
      nome: "Admin",
      tipoUsuario: "ADMIN",
      fotoPerfil:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fportuguese%2Fbrasil-50473006&psig=AOvVaw2lHSsQ15DXnl_eF8JCfHB_&ust=1727881167933000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCKDJ-Iu57YgDFQAAAAAdAAAAABAE",
    },
  });
}

executeSeed();

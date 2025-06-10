import express from "express";
import { rotasUsuario } from "./src/routes/rotasUsuarios.js";
import { rotasProduto } from "./src/routes/rotasProduto.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(rotasUsuario);
app.use(rotasProduto);

app.listen(3000, () => {
  console.log("Servidor iniciado 🚀");
});

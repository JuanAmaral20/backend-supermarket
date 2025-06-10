import jwt from "jsonwebtoken";

export function verificarAutenticacao(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).send();
  }

  const [, token] = req.headers.authorization.split(" ");

  const verificarValidade = jwt.verify(token, process.env.JWT);

  if (!verificarValidade) {
    return res.status(401).send();
  }

  return next();
}

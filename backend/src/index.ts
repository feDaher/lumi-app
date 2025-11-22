import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./risk.controller";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/risk", router);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});

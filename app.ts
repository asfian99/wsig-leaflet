import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 5000;

const prisma = new PrismaClient();

const main = async () => {
  app.use(express.static("./public"));

  app.set("views", "./views");
  app.set("view engine", "ejs");
  app.use(express.urlencoded({ extended: true }));

  app.get("/", async (_req, res) => {
    const allPom = await prisma.pomStation.findMany();

    res.render("index", { data: allPom, title: "Test Leaflet Map" });
  });

  app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

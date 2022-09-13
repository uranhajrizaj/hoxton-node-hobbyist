import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const port = 4567;

const prisma = new PrismaClient({ log: ["warn", "error", "info", "query"] });

app.get("/peoples", async (req, res) => {
  const peoples = await prisma.peoples.findMany({ include: { hobbies: true } });
  res.send(peoples);
});

app.get("/peoples/:id", async (req, res) => {
  const id = Number(req.params.id);
  const people = await prisma.peoples.findUnique({
    where: { id },
    include: { hobbies: true },
  });
  if (people) res.send(people);
  else res.status(404).send({ error: "People not found " });
});

app.post("/peoples", async (req, res) => {
  const newpeople = await prisma.peoples.create({
    data: req.body,
    include: { hobbies: true },
  });
  res.send(newpeople);
});

app.patch("/peoples/:id", async (req, res) => {
  const id = Number(req.body.id);
  const updatedPeople = await prisma.peoples.update({
    where: { id },
    data: req.body,
    include:{hobbies:true}
  });
  res.send(updatedPeople);
});

app.delete("/peoples/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedPeople = await prisma.peoples.delete({ where: { id } });
  res.send(deletedPeople);
});

app.get("/hobbies", async (req, res) => {
  const hobbies = await prisma.hobbies.findMany({ include: { people: true } });
  res.send(hobbies);
});

app.get("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const hobby = await prisma.hobbies.findUnique({
    where: { id },
    include: { people: true },
  });
  if (hobby) res.send(hobby);
  else res.status(404).send({ error: "Hobby not found " });
});

app.post("/hobbies", async (req, res) => {
  const newhobby = await prisma.hobbies.create({
    data: req.body,
    include: { people: true },
  });
  res.send(newhobby);
});

app.patch("/hobbies/:id", async (req, res) => {
  const id = Number(req.body.id);
  const updatedHobby = await prisma.hobbies.update({
    where: { id },
    data: req.body,
    include:{people:true}
  });
  res.send(updatedHobby);
});

app.delete("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedHobby = await prisma.hobbies.delete({ where: { id } });
  res.send(deletedHobby);
});

app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}/peoples`);
});

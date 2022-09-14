import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

const prisma = new PrismaClient({ log: ["warn", "error", "info", "query"] });

app.get("/people", async (req, res) => {
  const peoples = await prisma.people.findMany({ include: { hobbies: true } });
  res.send(peoples);
});

app.get("/people/:id", async (req, res) => {
  const id = Number(req.params.id);
  const people = await prisma.people.findUnique({
    where: { id },
    include: { hobbies: true },
  });
  if (people) res.send(people);
  else res.status(404).send({ error: "People not found " });
});

app.get("/people/:id", async (req, res) => {
  const id = Number(req.params.id);
  const people = await prisma.people.findUnique({
    where: { id },
    include: { hobbies: true },
  });
  if (people) res.send(people);
  else res.status(404).send({ error: "People not found " });
});

app.post("/people", async (req, res) => {
  const newPerson = {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    hobbies: req.body.hobbies ? req.body.hobbies : [],
  };
  const newpeople = await prisma.people.create({
    data: {
      name: newPerson.name,
      email: newPerson.email,
      picture: newPerson.picture,
      hobbies: {
        connectOrCreate: newPerson.hobbies.map((hobby: String) => ({
          where: { name: hobby },
          create: { name: hobby },
        })),
      },
    },
    include: { hobbies: true },
  });
  res.send(newpeople);
});

app.patch("/people/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updatePerson = {
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    hobbies: req.body.hobbies ? req.body.hobbies : [],
  };
  const updated = await prisma.people.update({
    where: { id },
    data: {
      name: updatePerson.name,
      email: updatePerson.email,
      picture: updatePerson.picture,
      hobbies: {
        connectOrCreate: updatePerson.hobbies.map((hobby: String) => ({
          where: { name: hobby },
          create: { name: hobby },
        })),
      },
    },
    include: { hobbies: true },
  });
  res.send(updated);
});

app.delete("/people/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedPeople = await prisma.people.delete({ where: { id } });
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
  const newHobby = {
    name: req.body.name,
    image: req.body.image,
    active: req.body.active,
    people: req.body.people ? req.body.people : [],
  };
  const newData = await prisma.hobbies.create({
    data: {
      name: newHobby.name,
      image: newHobby.image,
      active: newHobby.active,
      people: {
        connectOrCreate: newHobby.people.map((person: String) => ({
          where: { name: person },
          create: { name: person },
        })),
      },
    },
    include: { people: true },
  });
  res.send(newData);
});

app.patch("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const updateHobby = {
    name: req.body.name,
    image: req.body.image,
    active: req.body.active,
    people: req.body.people ? req.body.people : [],
  };
  const newData = await prisma.hobbies.update({
    where: { id },
    data: {
      name: updateHobby.name,
      image: updateHobby.image,
      active: updateHobby.active,
      people: {
        connectOrCreate: updateHobby.people.map((person: String) => ({
          where: { name: person },
          create: { name: person },
        })),
      },
    },
    include: { people: true },
  });
  res.send(newData);
});

app.delete("/hobbies/:id", async (req, res) => {
  const id = Number(req.params.id);
  const deletedHobby = await prisma.hobbies.delete({ where: { id } });
  res.send(deletedHobby);
});
app.listen(port, () => {
  console.log(`Server is running on : http://localhost:${port}/people`);
});

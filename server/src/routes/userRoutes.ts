import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (app: FastifyInstance) {
  app.post("/user/add", async (req, reply) => {
    const { name, email } = req.body as { name: string; email: string };
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    reply.send(newUser);
  });

  app.get("/user/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      reply.status(404).send({ error: "User not found" });
      return;
    }
    reply.send(user);
  });

  app.put("/user/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { name, email } = req.body as { name: string; email: string };
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { name, email },
    });
    reply.send(updatedUser);
  });

  app.delete("/user/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    reply.send({ message: "User deleted successfully" });
  });
}

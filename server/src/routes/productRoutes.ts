import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function (app: FastifyInstance) {
  app.post("/addLink/:userId/:link", async (req, reply) => {
    const { userId, link } = req.params as { userId: string; link: string };
    if (!link) {
      reply.status(400).send({ error: "Link is required" });
      return;
    }
    const code = Math.random().toString(36).substring(2, 10);
    const existingLink = await prisma.link.findUnique({
      where: { code },
    });
    if (existingLink) {
      reply.status(400).send({ error: "Link code already exists" });
      return;
    }
    const newLink = await prisma.link.create({
      data: {
        link,
        code,
        userId: parseInt(userId),
      },
    });
    reply.send(newLink);
  });

  app.get("/getAll", async (req, reply) => {
    const allLinks = await prisma.link.findMany();
    reply.send(allLinks);
  });

  app.get("/:code", async (req, reply) => {
    const { code } = req.params as { code: string };
    const link = await prisma.link.findUnique({
      where: {
        code,
      },
    });
    if (!link) {
      reply.status(404).send({ error: "Link not found" });
      return;
    }
    reply.send(link.link);
  });

  app.put("/updateLink/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    const { link } = req.body as { link: string };
    if (!link) {
      reply.status(400).send({ error: "Link is required" });
      return;
    }
    const updatedLink = await prisma.link.update({
      where: { id: parseInt(id) },
      data: { link },
    });
    reply.send(updatedLink);
  });

  app.delete("/deleteLink/:id", async (req, reply) => {
    const { id } = req.params as { id: string };
    await prisma.link.delete({
      where: { id: parseInt(id) },
    });
    reply.send({ message: "Link deleted successfully" });
  });
}

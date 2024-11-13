// src/server.ts
import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

const app = fastify();

// Middleware para registrar logs de erros
app.addHook('onError', (request, reply, error, done) => {
  console.error(error);
  done();
});

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: "API Documentation",
      description: "API Documentation with Swagger",
      version: "0.1.0",
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Registra o Swagger UI
app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: true,
  },
});

app.register(AutoLoad, {
  dir: path.join(__dirname, "routes"), 
  options: { prefix: '/api' }, 
});

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();

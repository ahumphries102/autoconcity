// ESM
import Fastify from "fastify";
import cors from "@fastify/cors";
const fastify = Fastify({
    logger: true,
});
fastify.register(cors, {
    origin: "http://localhost:5173", // allow Vue dev server
});
fastify.get("/", async (request, reply) => {
    return { message: "Hello from Fastify!" };
});
fastify.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});

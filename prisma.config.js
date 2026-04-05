const path = require("node:path");
const { defineConfig, env } = require("./server/node_modules/prisma/config");

try {
  require("./server/node_modules/dotenv").config({
    path: path.join(__dirname, "server", ".env"),
  });
} catch {
  // Fall back to existing environment variables.
}

module.exports = defineConfig({
  schema: "./server/prisma/schema.prisma",
  migrations: {
    path: "./server/prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
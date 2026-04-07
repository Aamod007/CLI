#!/usr/bin/env node

import dotenv from "dotenv";

import chalk from "chalk";
import figlet from "figlet";

import { Command } from "commander";

dotenv.config();

async function main() {
  // Display banner
  console.log(
    chalk.cyan(
      figlet.textSync("Orbit CLI", {
        font: "Standard",
        horizontalLayout: "default",
      })
    )
  );
  console.log(chalk.gray("A Cli based AI tool \n"));

  const program = new Command("orbitals");

  program.version("0.0.1").description("Orbit CLI - Device Flow Authentication");

  // Add commands
  program
    .command("wakeup")
    .description("Wake up the AI")
    .action(async () => {
      const { wakeUpAction } = await import("./commands/ai/wakeUp.js");
      await wakeUpAction();
    });
  program
    .command("login")
    .description("Login to Orbit")
    .action(async () => {
      const { loginAction } = await import("./commands/auth/login.js");
      await loginAction();
    });

  program
    .command("logout")
    .description("Logout from Orbit")
    .action(async () => {
      const { logoutAction } = await import("./commands/auth/login.js");
      await logoutAction();
    });

  program
    .command("whoami")
    .description("Show current user")
    .action(async () => {
      const { whoamiAction } = await import("./commands/auth/login.js");
      await whoamiAction();
    });

  // Default action shows help
  program.action(() => {
    program.help();
  });



  program.parse();
}

main().catch((error) => {
  console.error(chalk.red("Error running Orbit CLI:"), error);
  process.exit(1);
});
import { App } from "./app";

async function main() {
  const port: number = 4000;
  const app = new App(port);
  await app.listen();
}

main();

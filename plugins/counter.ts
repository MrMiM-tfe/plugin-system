import fs from "fs";
import App from "../main"
import {Request, Response} from "express"

let count = 0;
const name = "counter";

function load(app:App) {
  try {
    count = +fs.readFileSync('./counter.txt');
  } catch (e) {
    console.log('counter.txt not found. Starting from 0');
  }

  app.server.use((req: Request, res: Response, next) => {
    count++;
    fs.writeFileSync('./counter.txt', count.toString());
    next();
  });

  app.server.get('/count', (req: Request, res: Response) => {
    res.send({ count });
  })
}

// Save request count for next time
function unload(app:App) {
  fs.writeFileSync('./counter.txt', count.toString());
}

module.exports = {
  name,
  load,
  unload
};
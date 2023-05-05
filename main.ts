import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import EventEmitter from 'events';
import Plugins from './plugins';

dotenv.config();

const port = process.env.PORT ?? 8000;

class App extends EventEmitter {

    server: Express;
    stopped: boolean = false;
    plugins: Plugins;

    constructor() {
        super();

        this.plugins = new Plugins(this);

        this.server = express();
        this.server.use(express.json())
    }

    async start() {

        await this.plugins.loadPlugins()
        
        this.server.get('/', (req: Request, res: Response) => {
            res.send('Express + TypeScript Server');
        });

        this.server.listen(port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    }

    stop() {
        if (this.stopped) return;

        // stop plugins
        this.plugins.stop()

        console.log("Server stopped");
        this.emit('stop');
        this.stopped = true;
        process.exit();
    }
}

const app: App = new App();

app.start();


const stopEvents = ["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"];
stopEvents.forEach(event => {
    process.on(event, () => app.stop());
});

export default App
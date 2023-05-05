import fs from "fs";
import App from "./main"
import {Plugin} from "./types/plugin"

/**
 * dont edit this file !
 * 
 * this file get all plugins in plugin folder and load them
*/

// plugins dir
const PLUGINS_DIR = './plugins'

// regex to get fromat of file
const FORMAT_REGEX = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/gmi

// axcpeted files
const EXCEPTED_TYPES = [".ts", ".js"]

class Plugins {

    app: App;
    plugins: Plugin[];

    constructor(app: App) {
        this.app = app
        this.plugins = []
    }

    // run once and get all files to load
    async loadPlugins(){
        const files = fs.readdirSync(PLUGINS_DIR)
        files.forEach(file => {

            // get file type
            const regexList = file.match(FORMAT_REGEX)
            if (!regexList) return
            const type = regexList[0]

            // get the file name
            const name = file.split('.')[0]

            // check file type
            if (EXCEPTED_TYPES.includes(type)) {

                // load plugin
                this.load(name)                
            }
        })
    }

    // load plugin
    load(plugin: string) {

        // get path to file basse on name of the file
        const path = PLUGINS_DIR + "/" + plugin

        try {
            // import plugin and push to plugin list
            let module: Plugin = require(path);
            this.plugins.push(module);

            // run load func in plugin
            module.load(this.app)
            console.log(`Loaded plugin: '${module.name}'`);

        } catch (error) {            
            console.log(`Failed to load '${plugin}'`)
            // this.app.stop();
        }
    }

    unload(plugin:string) {
        // finde index of plugin in plugins list
        const index = this.plugins.findIndex(p => p.name === plugin)
        if (index === -1) return

        // run unload func in plugin
        this.plugins[index].unload(this.app)

        // delete plugin from plugins list
        this.plugins.splice(index, 1);

        console.log(`Unloaded plugin: '${plugin}'`);
    }

    stop() {
        this.plugins.forEach(plugin => {
            this.unload(plugin.name)
        })
    }
}

export default Plugins
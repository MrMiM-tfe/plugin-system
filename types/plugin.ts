import App from "../main"


// plugin
export interface Plugin {
    name: string;
    load: (app: App) => void;
    unload: (app: App) => void;
}
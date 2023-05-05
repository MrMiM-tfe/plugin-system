
const name = "loger"

const load = (app) => {
    console.log('ran');
    app.server.use((req, res, next) => {
        console.log("new request");
        next()
    })
}

const unload = (app) => {
    
}

module.exports = {
    name,
    load,
    unload
}
<br />

<h1 align="center">
    plugin system example with typescript
</h1>

<h4 align="center">
    plugin system for ts and js files
    <br/>
    especially for express
</h4>

## about this code:
&nbsp;
this code has `plugin.ts` file that reads plugins in `./plugin folder` and runs the `load` function of plugins when program starts and runs `unload` function when program stop. and recognize plugins by `name` property of every plugin this is exported in every plugin file.

&nbsp;
`load` and `unload` function in every plugin can get a parameter of type of `App` that must be imported from `main.ts` , the app contains every thing you can do with server or core of the application

<br/>
<br/>
<br/>

note: most this code is based on other code in internet that i don't remember


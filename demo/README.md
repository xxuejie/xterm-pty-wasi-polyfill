This is a demo showcasing xterm-pty powering a WASI app.

How to use it:

* Make sure you have [wasi-sdk](https://github.com/WebAssembly/wasi-sdk) installed.
* Setup `WASI_SDK_PATH` to point to the folder containing `wasi-sdk`
* Run the following commands:

```
$ npm i
$ npm run build
$ npm run start
```

A server should now be setup at `http://127.0.0.1:3000`, where you can use your browser to play with the demo.

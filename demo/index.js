const xterm = new Terminal();
xterm.open(document.getElementById("terminal"));

const { master, slave } = openpty();
xterm.loadAddon(master);

const worker = new Worker("./worker.js");
new TtyServer(slave, false).start(worker);

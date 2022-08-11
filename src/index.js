export * as constants from "./constants";

import * as wasi_polyfills from "./wasi";
import * as termios_polyfills from "./termios";

export const wasi = wasi_polyfills;
export const termios = termios_polyfills;

export const polyfills = {
  xterm_pty_polyfill: termios_polyfills,
  wasi_snapshot_preview1: wasi_polyfills,
};

export { setup } from "./utils";

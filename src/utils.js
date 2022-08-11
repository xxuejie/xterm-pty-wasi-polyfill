export function setup(wasm, tty_client) {
  self.__xterm_pty_wasi_polyfill_instance = {
    wasm,
    tty_client: new BufferedTtyClient(tty_client),
  };
}

export class BufferedTtyClient {
  constructor(tty_client) {
    this.tty_client = tty_client;
    this.buffer = [];
  }

  read(length) {
    if (this.buffer.length === 0) {
      this.buffer = this.tty_client.onRead(length);
      while (this.buffer.length === 0) {
        if (this.tty_client.onWaitForReadable(1000)) {
          this.buffer = this.tty_client.onRead(length);
        }
      }
    }

    if (length > this.buffer.length) {
      length = this.buffer.length;
    }
    return this.buffer.splice(0, length);
  }
}

export function fetch_tty_client() {
  return fetch_instance().tty_client;
}

export function fetch_wasm_memory() {
  return fetch_wasm_instance().exports.memory;
}

export function fetch_wasm_instance() {
  return fetch_instance().wasm;
}

export function fetch_instance() {
  return self.__xterm_pty_wasi_polyfill_instance;
}

export function memset(mem, ptr, c, size) {
  const uint8 = new Uint8Array(mem.buffer);
  uint8.fill(c, ptr, ptr + size);
}

export function read_value(mem, ptr, size) {
  const view = new DataView(mem.buffer);
  switch (size) {
    case 4:
      return view.getUint32(ptr, true);
    case 2:
      return view.getUint16(ptr, true);
      break;
    case 1:
      return view.getUint8(ptr);
    default:
      throw new Error(`Invalid size for write_value: ${size}!`);
  }
}

export function write_value(mem, ptr, value, size) {
  const view = new DataView(mem.buffer);
  switch (size) {
    case 8:
      view.setUint32(ptr, value, true);
      view.setUint32(ptr + 4, 0, true);
      break;
    case 4:
      view.setUint32(ptr, value, true);
      break;
    case 2:
      view.setUint16(ptr, value, true);
      break;
    case 1:
      view.setUint8(ptr, value);
      break;
    default:
      throw new Error(`Invalid size for write_value: ${size}!`);
  }
}

export function write64(mem, ptr, value_low, value_high) {
  const view = new DataView(mem.buffer);
  view.setUint32(ptr, value_low, true);
  view.setUint32(ptr + 4, value_high, true);
}

export function read64(mem, ptr) {
  const view = new DataView(mem.buffer);
  return {
    low: view.getUint32(ptr, true),
    high: view.getUint32(ptr + 4, true),
  };
}

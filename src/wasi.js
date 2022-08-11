import {
  read_value,
  write_value,
  fetch_tty_client,
  fetch_wasm_memory,
  memset,
} from "./utils";
import * as C from "./constants";

export function environ_get(environ, environ_buf) {
  throw new Error("TODO: implement environ_get");
}

export function environ_sizes_get(retptr0, retptr1) {
  let mem = fetch_wasm_memory();
  write_value(mem, retptr0, 0, C.WASI_SIZE_T_SIZEOF);
  write_value(mem, retptr1, 0, C.WASI_SIZE_T_SIZEOF);
  return 0;
}

export function fd_close(fd) {
  throw new Error("TODO: implement fd_close");
}

export function fd_fdstat_get(fd, retptr0) {
  if (fd !== 0 && fd !== 1 && fd !== 2) {
    return -1;
  }
  let mem = fetch_wasm_memory();
  memset(mem, retptr0, 0, C.WASI_FDSTAT_T_SIZEOF);
  write_value(
    mem,
    retptr0 + C.WASI_FDSTAT_T_OFFSETOF_FS_FILETYPE,
    C.WASI_FILETYPE_CHARACTER_DEVICE,
    C.WASI_FILETYPE_T_SIZEOF
  );
  return 0;
}

export function fd_read(fd, iovs, iovs_len, retptr0) {
  if (fd !== 0) {
    return -1;
  }
  const tty_client = fetch_tty_client();
  const memory = fetch_wasm_memory();
  const uint8 = new Uint8Array(memory.buffer);

  // Grab total available length first
  let readable = 0;
  for (let i = 0; i < iovs_len; i++) {
    const p = iovs + i * C.WASI_CIOVEC_T_SIZEOF;
    const data_len = read_value(
      memory,
      p + C.WASI_CIOVEC_T_OFFSETOF_BUF_LEN,
      C.WASI_SIZE_T_SIZEOF
    );
    readable += data_len;
  }

  // Try reading data
  let buf = tty_client.read(readable);

  // Fill iovs with newly read data
  if (buf.length > readable) {
    throw new Error("Reading more data than needed! Something must be wrong");
  }
  const actual_read = buf.length;
  let i = 0;
  while (buf.length > 0) {
    const p = iovs + i * C.WASI_CIOVEC_T_SIZEOF;
    const data_p = read_value(
      memory,
      p + C.WASI_CIOVEC_T_OFFSETOF_BUF,
      C.WASI_PTR_SIZEOF
    );
    const data_len = read_value(
      memory,
      p + C.WASI_CIOVEC_T_OFFSETOF_BUF_LEN,
      C.WASI_SIZE_T_SIZEOF
    );

    let len = data_len;
    if (len > buf.length) {
      len = buf.length;
    }
    uint8.set(buf.slice(0, len), data_p);
    buf.splice(0, len);
    i += 1;
  }

  write_value(memory, retptr0, actual_read, C.WASI_SIZE_T_SIZEOF);
  return 0;
}

export function fd_seek(fd, offset, whence, retptr0) {
  throw new Error("TODO: implement fd_seek");
}

export function fd_write(fd, iovs, iovs_len, retptr0) {
  // TODO: deal with stderr later
  if (fd !== 1) {
    return -1;
  }
  const tty_client = fetch_tty_client();
  const memory = fetch_wasm_memory();
  const uint8 = new Uint8Array(memory.buffer);

  let buf = [];
  let written = 0;

  for (let i = 0; i < iovs_len; i++) {
    const p = iovs + i * C.WASI_CIOVEC_T_SIZEOF;
    const data_p = read_value(
      memory,
      p + C.WASI_CIOVEC_T_OFFSETOF_BUF,
      C.WASI_PTR_SIZEOF
    );
    const data_len = read_value(
      memory,
      p + C.WASI_CIOVEC_T_OFFSETOF_BUF_LEN,
      C.WASI_SIZE_T_SIZEOF
    );
    const data = [].slice.call(uint8.slice(data_p, data_p + data_len));

    buf = buf.concat(data);
    written += data_len;
  }

  tty_client.tty_client.onWrite(buf);
  write_value(memory, retptr0, written, C.WASI_SIZE_T_SIZEOF);
  return 0;
}

export function proc_exit(rval) {
  throw new Error("TODO: implement proc_exit");
}

export function random_get(buf, buf_len) {
  const memory = fetch_wasm_memory();
  const uint8 = new Uint8Array(memory.buffer);

  self.crypto.getRandomValues(uint8.slice(buf, buf + buf_len));

  return 0;
}

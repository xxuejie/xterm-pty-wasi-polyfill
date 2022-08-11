import * as C from "./constants";
import {
  fetch_tty_client,
  fetch_wasm_memory,
  write_value,
  read_value,
  memset,
} from "./utils";

export function tcsetattr(fd, actions, ptr) {
  if (fd !== 0) {
    return -1;
  }
  const tty_client = fetch_tty_client().tty_client;
  const memory = fetch_wasm_memory();

  const iflag = read_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_IFLAG,
    C.TCFLAG_T_SIZEOF
  );
  const oflag = read_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_OFLAG,
    C.TCFLAG_T_SIZEOF
  );
  const cflag = read_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_CFLAG,
    C.TCFLAG_T_SIZEOF
  );
  const lflag = read_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_LFLAG,
    C.TCFLAG_T_SIZEOF
  );
  const cc = [];
  for (let i = 0; i < C.NCCS; i++) {
    cc.push(
      read_value(
        memory,
        ptr + C.TERMIOS_T_OFFSETOF_C_CC + i * C.CC_T_SIZEOF,
        C.CC_T_SIZEOF
      )
    );
  }
  const termios = new Termios(iflag, oflag, cflag, lflag, cc);
  tty_client.onIoctlTcsets(termios);
}

export function tcgetattr(fd, ptr) {
  if (fd !== 0) {
    return -1;
  }
  const tty_client = fetch_tty_client().tty_client;
  const memory = fetch_wasm_memory();
  const termios = tty_client.onIoctlTcgets();

  // Write termios to memory
  memset(memory, ptr, 0, C.TERMIOS_T_SIZEOF);
  write_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_IFLAG,
    termios.iflag,
    C.TCFLAG_T_SIZEOF
  );
  write_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_OFLAG,
    termios.oflag,
    C.TCFLAG_T_SIZEOF
  );
  write_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_CFLAG,
    termios.cflag,
    C.TCFLAG_T_SIZEOF
  );
  write_value(
    memory,
    ptr + C.TERMIOS_T_OFFSETOF_C_LFLAG,
    termios.lflag,
    C.TCFLAG_T_SIZEOF
  );
  for (let i = 0; i < C.NCCS; i++) {
    let value = 0;
    if (i < termios.cc.length) {
      value = termios.cc[i];
    }
    write_value(
      memory,
      ptr + C.TERMIOS_T_OFFSETOF_C_CC + i * C.CC_T_SIZEOF,
      value,
      C.CC_T_SIZEOF
    );
  }

  return 0;
}

export function tcgetwinsize(fd, ptr) {
  if (fd !== 0) {
    return -1;
  }
  const tty_client = fetch_tty_client().tty_client;
  const memory = fetch_wasm_memory();
  const [rows, cols] = tty_client.onIoctlTiocgwinsz();
  memset(memory, ptr, 0, C.WINSIZE_SIZEOF);
  write_value(
    memory,
    ptr + C.WINSIZE_OFFSETOF_WS_ROW,
    rows,
    C.WINSIZE_ITEM_SIZEOF
  );
  write_value(
    memory,
    ptr + C.WINSIZE_OFFSETOF_WS_COL,
    cols,
    C.WINSIZE_ITEM_SIZEOF
  );
}

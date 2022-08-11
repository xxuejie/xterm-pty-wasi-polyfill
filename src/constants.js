export const WASI_FILETYPE_CHARACTER_DEVICE = 2;
export const WASI_RIGHTS_FD_SEEK = 4;
export const WASI_RIGHTS_FD_TELL = 32;

export const WASI_PTR_SIZEOF = 4;
export const WASI_FILETYPE_T_SIZEOF = 1;
export const WASI_FDFLAGS_T_SIZEOF = 2;
export const WASI_RIGHTS_T_SIZEOF = 8;
export const WASI_SIZE_T_SIZEOF = 4;

export const WASI_FDSTAT_T_SIZEOF = 24;
export const WASI_FDSTAT_T_OFFSETOF_FS_FILETYPE = 0;
export const WASI_FDSTAT_T_OFFSETOF_FS_FLAGS = 2;
export const WASI_FDSTAT_T_OFFSETOF_FS_RIGHTS_BASE = 8;
export const WASI_FDSTAT_T_OFFSETOF_FS_RIGHTS_INHERITING = 16;

export const NCCS = 32;
export const TCFLAG_T_SIZEOF = 4;
export const CC_T_SIZEOF = 1;
export const TERMIOS_T_SIZEOF = 48;
export const TERMIOS_T_OFFSETOF_C_IFLAG = 0;
export const TERMIOS_T_OFFSETOF_C_OFLAG = 4;
export const TERMIOS_T_OFFSETOF_C_CFLAG = 8;
export const TERMIOS_T_OFFSETOF_C_LFLAG = 12;
export const TERMIOS_T_OFFSETOF_C_CC = 16;

export const WINSIZE_SIZEOF = 8;
export const WINSIZE_ITEM_SIZEOF = 2;
export const WINSIZE_OFFSETOF_WS_ROW = 0;
export const WINSIZE_OFFSETOF_WS_COL = 2;
export const WINSIZE_OFFSETOF_WS_XPIXEL = 4;
export const WINSIZE_OFFSETOF_WS_YPIXEL = 6;

export const WASI_CIOVEC_T_SIZEOF = 8;
export const WASI_CIOVEC_T_OFFSETOF_BUF = 0;
export const WASI_CIOVEC_T_OFFSETOF_BUF_LEN = 4;

export const WASI_IOVEC_T_SIZEOF = 8;
export const WASI_IOVEC_T_OFFSETOF_BUF = 0;
export const WASI_IOVEC_T_OFFSETOF_BUF_LEN = 4;

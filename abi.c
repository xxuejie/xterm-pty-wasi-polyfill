#include <stdio.h>
#include <wasi/api.h>
#include "termios.h"

int main() {
  printf("export const WASI_FILETYPE_CHARACTER_DEVICE = %d;\n", __WASI_FILETYPE_CHARACTER_DEVICE);

  printf("export const WASI_RIGHTS_FD_SEEK = %llu;\n", __WASI_RIGHTS_FD_SEEK);
  printf("export const WASI_RIGHTS_FD_TELL = %llu;\n", __WASI_RIGHTS_FD_TELL);
  printf("\n");

  printf("export const WASI_PTR_SIZEOF = %lu;\n", sizeof(uint8_t *));
  printf("export const WASI_FILETYPE_T_SIZEOF = %lu;\n", sizeof(__wasi_filetype_t));
  printf("export const WASI_FDFLAGS_T_SIZEOF = %lu;\n", sizeof(__wasi_fdflags_t));
  printf("export const WASI_RIGHTS_T_SIZEOF = %lu;\n", sizeof(__wasi_rights_t));
  printf("export const WASI_SIZE_T_SIZEOF = %lu;\n", sizeof(__wasi_size_t));
  printf("\n");

  printf("export const WASI_FDSTAT_T_SIZEOF = %lu;\n", sizeof(struct __wasi_fdstat_t));
  printf("export const WASI_FDSTAT_T_OFFSETOF_FS_FILETYPE = %lu;\n",
    offsetof(struct __wasi_fdstat_t, fs_filetype));
  printf("export const WASI_FDSTAT_T_OFFSETOF_FS_FLAGS = %lu;\n",
    offsetof(struct __wasi_fdstat_t, fs_flags));
  printf("export const WASI_FDSTAT_T_OFFSETOF_FS_RIGHTS_BASE = %lu;\n",
    offsetof(struct __wasi_fdstat_t, fs_rights_base));
  printf("export const WASI_FDSTAT_T_OFFSETOF_FS_RIGHTS_INHERITING = %lu;\n",
    offsetof(struct __wasi_fdstat_t, fs_rights_inheriting));
  printf("\n");

  printf("export const NCCS = %d\n", NCCS);
  printf("export const TCFLAG_T_SIZEOF = %lu;\n", sizeof(tcflag_t));
  printf("export const CC_T_SIZEOF = %lu;\n", sizeof(cc_t));
  printf("export const TERMIOS_T_SIZEOF = %lu;\n", sizeof(struct termios));
  printf("export const TERMIOS_T_OFFSETOF_C_IFLAG = %lu;\n",
    offsetof(struct termios, c_iflag));
  printf("export const TERMIOS_T_OFFSETOF_C_OFLAG = %lu;\n",
    offsetof(struct termios, c_oflag));
  printf("export const TERMIOS_T_OFFSETOF_C_CFLAG = %lu;\n",
    offsetof(struct termios, c_cflag));
  printf("export const TERMIOS_T_OFFSETOF_C_LFLAG = %lu;\n",
    offsetof(struct termios, c_lflag));
  printf("export const TERMIOS_T_OFFSETOF_C_CC = %lu;\n",
    offsetof(struct termios, c_cc));
  printf("\n");

  printf("export const WINSIZE_SIZEOF = %lu;\n", sizeof(struct winsize));
  printf("export const WINSIZE_ITEM_SIZEOF = %lu;\n", sizeof(unsigned short));
  printf("export const WINSIZE_OFFSETOF_WS_ROW = %lu;\n",
    offsetof(struct winsize, ws_row));
  printf("export const WINSIZE_OFFSETOF_WS_COL = %lu;\n",
    offsetof(struct winsize, ws_col));
  printf("export const WINSIZE_OFFSETOF_WS_XPIXEL = %lu;\n",
    offsetof(struct winsize, ws_xpixel));
  printf("export const WINSIZE_OFFSETOF_WS_YPIXEL = %lu;\n",
    offsetof(struct winsize, ws_ypixel));
  printf("\n");

  printf("export const WASI_CIOVEC_T_SIZEOF = %lu;\n", sizeof(struct __wasi_ciovec_t));
  printf("export const WASI_CIOVEC_T_OFFSETOF_BUF = %lu;\n",
    offsetof(struct __wasi_ciovec_t, buf));
  printf("export const WASI_CIOVEC_T_OFFSETOF_BUF_LEN = %lu;\n",
    offsetof(struct __wasi_ciovec_t, buf_len));
  printf("\n");

  printf("export const WASI_IOVEC_T_SIZEOF = %lu;\n", sizeof(struct __wasi_iovec_t));
  printf("export const WASI_IOVEC_T_OFFSETOF_BUF = %lu;\n",
    offsetof(struct __wasi_iovec_t, buf));
  printf("export const WASI_IOVEC_T_OFFSETOF_BUF_LEN = %lu;\n",
    offsetof(struct __wasi_iovec_t, buf_len));
}

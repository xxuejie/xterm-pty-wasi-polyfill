linenoise_example.wasm: linenoise/linenoise.h linenoise/linenoise.c

linenoise_example.wasm: linenoise/linenoise.c example.c
	${WASI_SDK_PATH}/bin/clang --sysroot=${WASI_SDK_PATH}/share/wasi-sysroot -Wall -W -Os -g -I .. -I linenoise -o linenoise_example.wasm linenoise/linenoise.c example.c

clean:
	rm -f linenoise_example.wasm

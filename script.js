let wasmExport;
let wasmMemory = new WebAssembly.Memory({initial:256, maximum:256});
let wasmTable = new WebAssembly.Table({
    'initial': 1,
    'maximum': 1,
    'element': 'anyfunc'
})

let asmLibraryArg = {
    "__handle_stack_overflow": ()=>{},
    "emscripten_resize_heap": ()=>{},
    "__lock": ()=>{}, 
    "__unlock": ()=>{},
    "memory": wasmMemory, 
    "table": wasmTable 
}

let info = {
    //enviroment 
    'env' : asmLibraryArg,
    //wasm snapshot preview
    'wasi_snapshot_preview1': asmLibraryArg
}

async function loadWasm(){
    let repsonse = await fetch('5b012fb4dcdcd11e.wasm');
    let byte = await repsonse.arrayBuffer();
    let wasmObj = await WebAssembly.instantiate(byte, info);
    let wasmExport = wasmObj.instance.exports;
}

loadWasm();
// default import all the functions/classes/variables from
// the c++ translated js file
import createSkyModule from "../build/sky.js";

/*
ANY _functionName() method is from emscripten's module
object

the C++ and js codebase share the same memory space, we access it through the module's HEAPF64
any writes into that memory space can be read from both cpp and js

nested try blocks

the main func has to be async cuz of our await calls for emscripten's modules to be ready

await HAS to be inside of an async function/scope
*/

async function main() {
  // attaches to the id="status" element in index.html
  // so any changes made here directly affects the DOM
  const status = document.querySelector("#status");
  // attach to canvas id="sky" in index.html
  const canvas = document.querySelector("#sky");

  try {
    // replaces paragraph tag in index.html
    status.textContent = "Loading Wasm...";

    // instantiate emscripten module
    const Module = await createSkyModule();

    status.textContent = "Loading star data...";
    const response = await fetch("./stars.json");

    // if loading the stars file failed throw a newly constructed exception obj
    if (!response.ok) {
      throw new Error(`Could not load stars.json: ${response.status}`);
    }

    // fetch the stars.json
    const stars = await response.json();

    if (!Array.isArray(stars)) {
      // throw exception if it ISN'T an array
      throw new Error("stars.json must contain a JSON array.");
    }

    const count = stars.length;

    if (count === 0) {
      throw new Error("The star list is empty.");
    }

    // allocate typed arrays ( an explicit type of the array)
    // for ra, dec, and the xy co ordinates of stars
    const ra = new Float64Array(count);
    const dec = new Float64Array(count);
    const x = new Float64Array(count);
    const y = new Float64Array(count);

    // populate right ascension and declination buffers with the json data
    for (let i = 0; i < count; i++) {
      ra[i] = Number(stars[i].ra);
      dec[i] = Number(stars[i].dec);

      // guard checking the values of the newly created buffers
      // ( if they end up NON-finite, due to bad json parsing, throw exception )
      // doing undefined mathematical operations like 1/0 will give Infinity type, which would NOT be finite, hence throw exception
      if (!Number.isFinite(ra[i]) || !Number.isFinite(dec[i])) {
        throw new Error(`Star ${i} has invalid coordinates.`);
      }
    }

    const bytes = count * Float64Array.BYTES_PER_ELEMENT; // number of elements * 8 bytes (64bits)

    // allocate memory for the star arrays on the EMSCRIPTEN's heap

    // _malloc() (emsripten's malloc)
    // allocates memory on the heap and gives back a ptr with the address of the first byte
    // allocation happens in byte size
    const raPtr = Module._malloc(bytes);
    const decPtr = Module._malloc(bytes);
    const xPtr = Module._malloc(bytes);
    const yPtr = Module._malloc(bytes);

    // guard checking for
    // ANY failure to allocate the buffers on the heap
    if (!raPtr || !decPtr || !xPtr || !yPtr) {
      throw new Error("Could not allocate memory for the star arrays.");
    }

    try {
      // this lets us know how many bytes each element in the typed array takes on the heap
      // for pointer arithmetic
      const bytesPerElement = Float64Array.BYTES_PER_ELEMENT;
      // elementsPerNumber should be 8 bytes

      // copy values from ra and dec typed arrays into my heap allocated arrays
      // ra and dec are the input buffers, raPtr and decPtr are the webassembly heap buffers

      // same as doing memcpy, first arguement is the source buffer, second arg is destination buffer
      // starting at index raPtr/bytesPerElement
      Module.HEAPF64.set(ra, raPtr / bytesPerElement);
      Module.HEAPF64.set(dec, decPtr / bytesPerElement);

      // i could also use cwrap() to wrap the c++ function as a js function and call it directly
      // if i was using it way more than just once in this codebase

      // Module.cwrap(
      //   // name of the c++ function to wrap
      //   "project_stars",
      //   // the return type of that c++ function
      //   null,
      //   // the types of the arguments of that c++ function ( number is an abstract way to say = double int float long etc )
      //   ["number", "number", "number", "number", "number", "number", "number"],
      //   // passing in the actual arguements
      // )(raPtr, decPtr, xPtr, yPtr, count, canvas.width, canvas.height);

      // // calling the function in JS directly
      // project_stars(
      //   raPtr,
      //   decPtr,
      //   xPtr,
      //   yPtr,
      //   count,
      //   canvas.width,
      //   canvas.height,
      // );

      // directly calling the C++ function from emscripten's module object
      Module.ccall(
        "project_stars",
        // void return type
        null,
        ["number", "number", "number", "number", "number", "number", "number"], // param types
        [raPtr, decPtr, xPtr, yPtr, count, canvas.width, canvas.height],
      );

      // copy the results from the webassembly ra and dec buffers, back into JS, but as X and Y values ( into their respective typed array buffers )
      x.set(
        Module.HEAPF64.subarray(
          xPtr / bytesPerElement, // start index
          xPtr / bytesPerElement + count, // end index
        ),
      );

      y.set(
        Module.HEAPF64.subarray(
          yPtr / bytesPerElement, // start index
          yPtr / bytesPerElement + count, // end index
        ),
      );

      // codeblock which WILL run regardless of exceptions or not  ( RAII-like implementation )
    } finally {
      // follows cpp RAII convention, regardless of whether an exception is thrown or not, this block will run ( mem safety )
      Module._free(raPtr);
      Module._free(decPtr);
      Module._free(xPtr);
      Module._free(yPtr);
    }

    /*
        clear canvas to prepare for drawing 
    */

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // iterate for every star (star.length)
    for (let i = 0; i < count; i++) {
      const magnitude = Number(stars[i].magnitude ?? 3); // if magnitude is null, default is 3
      const radius = Math.max(1, 4 - magnitude * 0.5);

      ctx.beginPath();
      // draw a circle at coordinates x[i], y[i]
      // start angle is 0, and end at angle 2*pi which is a full circle
      ctx.arc(x[i], y[i], radius, 0, Math.PI * 2);
      ctx.fillStyle = "#fefffe";
      ctx.fill();

      ctx.fillStyle = "#a900fd";
      // filling the names of the stars
      ctx.fillText(stars[i].name, x[i] + 5, y[i] - 5);
    }

    status.textContent = `Displaying ${count} stars.`;
  } catch (error) {
    // print to the error output stream
    console.error(error);
    // catch the exception with specification on where it happened and what
    console.log(error.stack);
    // the message was
    status.textContent = `Exception that was thrown: ${error.message}`; // v8's stack trace format : https://v8.dev/docs/stack-trace-api
    // more of what the stack shows: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack
  }
}

main();

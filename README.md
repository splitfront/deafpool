# DEAFPOOL

## What?

It's a quick and dirty implementation of a "worker pool" pattern:

- `Promise`-based
- Zero deps, pure JS.
- Made to be copy-pasted into your node scripts.
- Drop-in integration. Copy, paste, edit to taste.
- Not intended for use in prod. No warranty. I am not responsible.
  Be creative, and this thing will leak memory,
  thermo-throttle processors, and wreak general havok.
- «Deaf», because there's no way to terminate execution
  or cue more stuff into the active cueue.
  You start, you wait, and `.then()` you get `results`.

## Why?

- ...my own?
    - Everything else is too enterprise to my taste
      (too many deps, over-engineering, OOP).
- ...no `async`/`await`?
    - Toy code with `Promise`s has better visual affordances.
    - NB: `async`/`await` isn't just some synthactic sugar
      on top of Promises. Read up and don't repead my mistakes.

## How?

BYO payload. Use worker-threads, web-workers, shell utils in async wrappers.

## What does it lack?

- a nicer API
    - `const runner = makeRunner(getCustomPromise);`
    - `runner([1,2,3]).then(console.log);`
- make a zero-dependency NPM package & publish it
- some way to pause or cancel running tasks
- error/rejection/exception handling
    - this warrants a rewrite with `async`/`await`
- more robust implementation of deterministic order in results' iterable
    - should work like an `Array.map()`
    - `generators`, `iterators` etc.?
- runtime-parametrised pool size, autodetect by default -- `number_of_cores - 2`

By design, it lacks everything, b/c POC/MVP/demo/example made to be messed with.

## re: async/await vs promises:

> The async and await keywords enable asynchronous, promise-_based_ behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains. If the return value of an async function is not explicitly a promise, it will be implicitly wrapped in a promise. Even though the return value of an async function behaves as if it's wrapped in a Promise.resolve, they are _not equivalent_.

> An async function will return a different reference, whereas Promise.resolve returns the same reference if the given value is a promise.

> It can be a problem when you want to check the equality of a promise and a return value of an async function.

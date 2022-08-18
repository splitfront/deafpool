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
    - `const runner = makeRunner(getCustomPromise); runner([1,2,3]).then(console.log);`
- make a zero-dependency NPM package & publish it
- someway to pause or cancel running tasks
    - `run([1,2]).then(processArray)`
- error/rejection/exception handling
- more robust implementation of deterministic order in results' iterable
- runtime-parametrised pool size -- if I were you, I'd go for `number_of_cores - 2`

By design, it lacks everything, b/c POC/MVP/demo/example made to be messed with.

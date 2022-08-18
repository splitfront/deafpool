# DEAFPOOL

## What?
Promise-based, quick and dirty implementation of a "worker pool" pattern:

- "Deaf" cuz there's no way to terminate execution or cueue more stuff. You start it, you wait, `.then()` you get `results`.
- Zero deps, pure JS.
- Drop-in integration. Copy, paste, edit to taste.
- Not production-ready. No warranty.
- Intended use: copypaste into utility scripts made for local file processing.

## Why?

- ...my own?
    - Everything else is too enterprise to my taste (too many deps, over-engineering, OOP).

- ...no `async`/`await`?
    - Code with `Promise`s has better visual affordances.
        - (it's in the indentations)

## How?

BYO\*! Use worker-threads, web-workers, shell stuff in async wrappers or whatever.

## What does it lack?

It's a POC/MVP/demo/example, thus -- everything. From the top of my head:

- a nicer API
    - `const runner = makeRunner(getCustomPromise); runner([1,2,3]).then(console.log);`
- make a zero-dependency NPM package.
- no way to pause or cancel execution.
    - `run([1,2]).then(processArray)`.
- no error/rejection/exception handling.
- more robust implementation of deterministic order in results' iterable.
- pool size should probably be runtime-parametrised.
    - detect number of cores?


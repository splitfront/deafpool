const POOL_SIZE = 2;

// returned promise resolves in ~.5 sec
function getTestPromise(payload) {
    return new Promise((resolve) => {
        const output = {
            // `id` is for later, to figure out which job raced 1st
            id : payload,
            result : `OK: ${payload}`
        }
        setTimeout(() => resolve(output), Math.random() * 1e2);
    });
}

// - jobs are returned as-is,
// - strings are converted to jobs
function ensureJob(jobOrString, getPromise) {
    // or a number, or whatever - not whatever is a job's container
    if (typeof jobOrString === 'string') {
        return {
            // `id` is for later, to figure out which job raced 1st
            id : jobOrString,
            promise : getPromise(jobOrString)
        }
    } else {
        return jobOrString;
    }
}

// drop a value from array and return the rest
function without(foos, foo) {
    return [...new Set(foos).delete(foo)];
}

function run(payloads) {
    if (payloads.length === 0) {
        return Promise.resolve([])
    }

    const batch = payloads.slice(0, POOL_SIZE);
    const cueue = payloads.slice(POOL_SIZE);
    const jobs = batch.map(payload => ensureJob(payload, getTestPromise));
    const promises = jobs.map(j => j.promise);

    return Promise
        .race(promises)
        .then(({id: winnerId, result: winnerResult}) => {
            const dropWinner = (filtered, j) => {
                return j.id === winnerId
                    ? filtered
                    : [...filtered, j]
            }
            const pending = jobs.reduce(dropWinner, [])
            const newPayloads = [
                ...pending,
                ...cueue
            ]
            return Promise
                .all([
                    winnerResult,
                    run(newPayloads)
                ])
                .then( ([head, tail]) => {
                    // @todo jobs have ordered IDs etc for sorting
                    const needsProperSorting = [head, ...tail].sort();
                    return Promise.resolve(needsProperSorting)
                });
        })
}

const payloads = ["1 - foo", "2 - bar", "3 - baz", "4 - quux", "5 - zoz"]
run(payloads)
    .then(console.log)

// ==========================================
// BISECTION METHOD MODULE
// This file ONLY handles algorithm logic
// Separation of concerns (VERY IMPORTANT)
// ==========================================

function bisectionMethod(f, xl, xu, tol, maxIter) {

    let xr = 0;      // current root
    let xrold = 0;   // previous root
    let ea = 100;    // error
    let iter = 0;

    let results = []; // store iterations

    while (ea > tol && iter < maxIter) {

        xrold = xr;

        // Core formula from PDF:
        // xr = (xl + xu) / 2
        xr = (xl + xu) / 2;

        // Check sign
        let test = f(xl) * f(xr);

        // Decide interval update
        if (test < 0) {
            xu = xr;
        } else if (test > 0) {
            xl = xr;
        } else {
            ea = 0; // exact root
        }

        // Error calculation
        if (xr !== 0) {
            ea = Math.abs((xr - xrold) / xr) * 100;
        }

        iter++;

        // Save iteration data
        results.push({
            iteration: iter,
            xr: xr,
            error: ea
        });
    }

    return results;
}

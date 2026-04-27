// ==========================================
// SECANT METHOD
// Root finding without needing derivative
//
// Formula:
// x_next = x1 - f(x1)*(x0-x1)/(f(x0)-f(x1))
//
// Inputs:
// f       -> function f(x)
// x0,x1   -> initial guesses
// tol     -> stopping tolerance (%)
// maxIter -> maximum iterations
//
// Returns:
// array of iteration objects
// ==========================================

function secantMethod(f, x0, x1, tol, maxIter) {

    let iter = 0;
    let ea = 100;       // approximate error
    let x2 = 0;         // new estimate

    let results = [];

    while (ea > tol && iter < maxIter) {

        // Evaluate function values
        let fx0 = f(x0);
        let fx1 = f(x1);

        // Avoid division by zero
        if ((fx0 - fx1) === 0) {
            alert("Division by zero encountered.");
            break;
        }

        // Secant formula
        x2 = x1 - (fx1 * (x0 - x1)) / (fx0 - fx1);

        // Compute approximate relative error
        if (x2 !== 0) {
            ea = Math.abs((x2 - x1) / x2) * 100;
        }

        iter++;

        // Save iteration data
        results.push({
            iteration: iter,
            xr: x2,
            error: ea
        });

        // Shift guesses forward
        x0 = x1;
        x1 = x2;
    }

    return results;
}

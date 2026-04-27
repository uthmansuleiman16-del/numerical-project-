// ==========================================
// GAUSS-JORDAN ELIMINATION
//
// Solves:
// A*x = b
//
// Converts augmented matrix [A|b]
// into Reduced Row Echelon Form (RREF)
//
// Returns:
// solution vector x
// ==========================================

function gaussJordan(A, b) {

    // Number of equations
    let n = A.length;

    // ----------------------------
    // Build augmented matrix [A|b]
    // ----------------------------
    let M = [];

    for (let i = 0; i < n; i++) {

        M[i] = [...A[i], b[i]];
    }

    // ----------------------------
    // Main elimination process
    // ----------------------------
    for (let i = 0; i < n; i++) {

        // ------------------------
        // Partial pivoting
        // (swap largest row upward)
        // ------------------------
        let maxRow = i;

        for (let k = i+1; k < n; k++) {

            if (Math.abs(M[k][i]) > Math.abs(M[maxRow][i])) {

                maxRow = k;
            }
        }

        // Swap rows
        [M[i], M[maxRow]] = [M[maxRow], M[i]];


        // ------------------------
        // Make pivot = 1
        // ------------------------
        let pivot = M[i][i];

        if (pivot === 0) {
            throw new Error("Singular system.");
        }

        for (let j = 0; j <= n; j++) {

            M[i][j] /= pivot;
        }


        // ------------------------
        // Eliminate other rows
        // ------------------------
        for (let k = 0; k < n; k++) {

            if (k !== i) {

                let factor = M[k][i];

                for (let j = 0; j <= n; j++) {

                    M[k][j] -= factor * M[i][j];
                }
            }
        }
    }

    // ----------------------------
    // Extract solution
    // ----------------------------
    let x = [];

    for (let i = 0; i < n; i++) {

        x[i] = M[i][n];
    }

    return x;
}

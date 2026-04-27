// ==========================================
// CRAMER'S RULE (General n x n)
//
// x_i = det(A_i) / det(A)
//
// Requires determinant function
// ==========================================



// ------------------------------
// Recursive determinant function
// ------------------------------
function determinant(matrix) {

    let n = matrix.length;

    // Base case 1x1
    if (n === 1) {
        return matrix[0][0];
    }

    // Base case 2x2
    if (n === 2) {

        return (
            matrix[0][0]*matrix[1][1]
          - matrix[0][1]*matrix[1][0]
        );
    }

    // Recursive cofactor expansion
    let det = 0;

    for (let col = 0; col < n; col++) {

        let sub = [];

        // Build submatrix
        for (let i = 1; i < n; i++) {

            let row = [];

            for (let j = 0; j < n; j++) {

                if (j !== col) {
                    row.push(matrix[i][j]);
                }
            }

            sub.push(row);
        }

        det +=
            Math.pow(-1, col)
            * matrix[0][col]
            * determinant(sub);
    }

    return det;
}




// --------------------------------
// Cramer's Rule Solver
// --------------------------------
function cramerRule(A, b) {

    let n = A.length;

    let detA = determinant(A);

    if (detA === 0) {

        throw new Error(
            "Determinant zero. No unique solution."
        );
    }

    let x = [];

    // Solve each variable
    for (let col = 0; col < n; col++) {

        // Clone matrix
        let Ai = A.map(row => [...row]);

        // Replace one column by b
        for (let row = 0; row < n; row++) {

            Ai[row][col] = b[row];
        }

        // Cramer's formula
        x[col] = determinant(Ai) / detA;
    }

    return x;
}

// ========================================
// SHOW/HIDE INPUTS
// Smart UI switching
// ========================================

function toggleInputs(){

    const method =
      document.getElementById(
        "methodSelect"
      ).value;


    // Root method inputs
    if(method === "secant"){

        document.getElementById(
          "rootInputs"
        ).style.display="block";


        document.getElementById(
          "linearInputs"
        ).style.display="none";
    }

    else{

        document.getElementById(
          "rootInputs"
        ).style.display="none";


        document.getElementById(
          "linearInputs"
        ).style.display="block";
    }
}




// ========================================
// Parse f(x) from text
// Example:
// x*x-4
// ========================================

function parseFunction(expr){

    return function(x){

        return eval(expr);
    };
}




// ========================================
// Convert text matrix into array
//
// Example:
// 2,1
// 5,7
//
// becomes:
// [[2,1],[5,7]]
// ========================================

function parseMatrix(text){

    return text
      .trim()
      .split("\n")
      .map(
        row =>
         row.split(",")
         .map(Number)
      );
}




// ========================================
// Convert:
// 11,13
// into:
// [11,13]
// ========================================

function parseVector(text){

    return text
      .split(",")
      .map(Number);
}





// ========================================
// MAIN EXECUTION ENGINE
// ========================================

function runMethod(){

    const method =
      document.getElementById(
       "methodSelect"
      ).value;


    let output = "";



    // ----------------------------
    // SECANT
    // ----------------------------
    if(method==="secant"){

       const expr =
       document.getElementById(
         "functionInput"
       ).value;

       const x0 =
       parseFloat(
         document.getElementById(
          "x0"
         ).value
       );

       const x1 =
       parseFloat(
         document.getElementById(
          "x1"
         ).value
       );

       const tol =
       parseFloat(
         document.getElementById(
           "tol"
         ).value
       );

       const maxIter =
       parseInt(
         document.getElementById(
          "maxIter"
         ).value
       );


       const f =
       parseFunction(expr);


       let results =
       secantMethod(
         f,x0,x1,tol,maxIter
       );


       // Show iteration table
       output =
       "<h3>Iterations</h3>";

       results.forEach(r=>{

          output +=
          `
          Iter ${r.iteration}
          | xr=${r.xr.toFixed(6)}
          | error=${r.error.toFixed(6)}%
          <br>
          `;
       });

    }



    // ----------------------------
    // GAUSS JORDAN
    // ----------------------------
    else if(
      method==="gaussJordan"
    ){

      let A=
      parseMatrix(
       document.getElementById(
        "matrixA"
       ).value
      );

      let b=
      parseVector(
       document.getElementById(
        "vectorB"
       ).value
      );


      let x=
      gaussJordan(A,b);


      output=
      "<h3>Solution</h3>";

      x.forEach(
       (v,i)=>{
         output+=
         `x${i+1}
          = ${v}<br>`;
       }
      );
    }



    // ----------------------------
    // CRAMER
    // ----------------------------
    else if(
      method==="cramer"
    ){

      let A=
      parseMatrix(
       document.getElementById(
        "matrixA"
       ).value
      );

      let b=
      parseVector(
       document.getElementById(
        "vectorB"
       ).value
      );


      let x=
      cramerRule(A,b);


      output=
      "<h3>Solution</h3>";

      x.forEach(
       (v,i)=>{
         output+=
         `x${i+1}
          = ${v}<br>`;
       }
      );
    }



   // ----------------------------
   // Show output
   // ----------------------------
   document.getElementById(
    "resultBox"
   ).innerHTML=output;
}



// Run once at page load
toggleInputs();

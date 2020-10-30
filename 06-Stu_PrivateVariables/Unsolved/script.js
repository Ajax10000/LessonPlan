function getPolynomialObject(pCoeffs) {
    // Check the parameter pCoeffs
    if (pCoeffs === null) {
        throw new Exception("Parameter cannot be null.");
    }
    if (!Array.isArray(pCoeffs)) {
        throw new Exception("The parameter must be an array of integers.");
    }
    if (pCoeffs.length === 0) {
        throw new Exception("The array passed in must not be empty.");
    }

    // Add another parameter check here to make sure all elements in the pCoeffs
    // array are integers. Use the Number.isInteger method.

    let Polynomial = (function(pCoeffs) {
        // Our private properties:
        let coeffs = [];
        let vPlus, vMinus;

        // Modify this method to avoid integer overflow when multiplying coefficients. 
        // Use Math.sign.
        function _calculateVPlus() {
            let nonZeroCoeffs = [];
            let j = 0;

            // coeffs holds the coefficients of our polynomial p(x)
            // nonZeroCoeffs holds the non-zero coefficients of p(x)
            for (let i = 0; i < coeffs.length; i++) {
                if (coeffs[i] !== 0) {
                    nonZeroCoeffs[j] = coeffs[i];
                    j++;
                }
            }

            vPlus = 0;
            for (let i = 0; i < nonZeroCoeffs.length - 1; i++) {
                if ((nonZeroCoeffs[i]*nonZeroCoeffs[i+1]) < 0) {
                    vPlus++;
                }
            }
        }

        // Modify this method to avoid integer overflow when multiplying coefficients. 
        // Use Math.sign.
        function _calculateVMinus() {
            let nonZeroCoeffs = [];
            let j = 0;
            
            // coeffs holds the coefficients of our polynomial p(x)
            // nCoeffs holds the non-zero coefficients of p(-x)
            for (let i = 0; i < coeffs.length; i++) {
                if (coeffs[i] !== 0) {
                    if ((i % 2) === 0) {
                        nonZeroCoeffs[j] = coeffs[i];
                    } else {
                        nonZeroCoeffs[j] = -coeffs[i];
                    }
                    j++;
                }
            }

            vMinus = 0;
            for (let i = 0; i < nonZeroCoeffs.length - 1; i++) {
                if ((nonZeroCoeffs[i]*nonZeroCoeffs[i+1]) < 0) {
                    vMinus++;
                }
            }
        }

        function getCoeffs() {
            let coeffsCopy = [];

            for (let i = 0; i < coeffs.length; i++) {
                coeffsCopy.push(coeffs[i]);
            }

            return coeffsCopy;
        }

        function getVPlus() {
            if (vPlus === undefined) {
                _calculateVPlus();
            }
            return vPlus;
        }

        function getVMinus() {
            if (vMinus === undefined) {
                _calculateVMinus();
            }
            return vMinus;
        }

        // Add method getDisplayPolynomial here



        for (let i = 0; i < pCoeffs.length; i++) {
            coeffs.push(pCoeffs[i]);
        }

        return {
            getCoeffs: getCoeffs,
            getVPlus: getVPlus,
            getVMinus: getVMinus
            // add getDisplayPolynomial property here
        };
    })(pCoeffs);

    return Polynomial;
}
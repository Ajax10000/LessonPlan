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
    for (let i = 0; i < pCoeffs.length; i++) {
        if (!Number.isInteger(pCoeffs[i])) {
            throw new Exception("All elements of array passed in must be integers.")
        }
    }
    
    let Polynomial = (function(pCoeffs) {
        // Our private properties:
        let coeffs = [];
        let vPlus, vMinus;

        function _calculateVPlus() {
            let nonZeroCoeffs = [];
            let j = 0;

            // coeffs holds the coefficients of our polynomial p(x)
            // nonZeroCoeffs holds the non-zero coefficients of p(x)
            for (let i = 0; i < coeffs.length; i++) {
                if (coeffs[i] !== 0) {
                    nonZeroCoeffs[j] = Math.sign(coeffs[i]);
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

        function _calculateVMinus() {
            let nonZeroCoeffs = [];
            let j = 0;
            
            // coeffs holds the coefficients of our polynomial p(x)
            // nCoeffs holds the non-zero coefficients of p(-x)
            for (let i = 0; i < coeffs.length; i++) {
                if (coeffs[i] !== 0) {
                    if ((i % 2) === 0) {
                        nonZeroCoeffs[j] = Math.sign(coeffs[i]);
                    } else {
                        nonZeroCoeffs[j] = Math.sign(-coeffs[i]);
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

        function getDisplayPolynomial() {
            let displayStr = "";

            // We do not display a variable next to the constant coefficient
            if (coeffs[0] !== 0) {
                displayStr = coeffs[0];
            }

            // We do display a variable next to the linear coefficient, 
            // but the exponent is 1 and we don't display the exponent
            if (coeffs[1] !== 0) {
                if (coeffs[1] < 0) {
                    if (coeffs[1] !== -1)
                        displayStr = displayStr + " - " + (-coeffs[1]) + "x";
                    else {
                        // If the coefficient is -1, we don't display it (it is assumed to be -1)
                        displayStr = displayStr + " - x";
                    }
                } else {
                    if (coeffs[1] !== 1) {
                        displayStr = displayStr + " + " + coeffs[1] + "x";
                    } else {
                        // If the coefficient is 1, we don't display it (it is assumed to be 1)
                        displayStr = displayStr + " + x";
                    }
                }
            }

            // Display the other coefficients (unless they are 0)
            for (let i = 2; i < coeffs.length; i++) {
                if (coeffs[i] !== 0) {
                    if (coeffs[i] < 0) {
                        if (coeffs[i] !== -1) {
                            displayStr = displayStr + " - " + (-coeffs[i]) + "x<sup>" + i + "</sup>";
                        } else {
                            // If the coefficient is -1, we don't display it (it is assumed to be -1)
                            displayStr = displayStr + " - x<sup>" + i + "</sup>";
                        }
                    } else {
                        if (coeffs[i] !== 1) {
                            displayStr = displayStr + " + " + coeffs[i] + "x<sup>" + i + "</sup>";
                        } else {
                            // If the coefficient is 1, we don't display it (it is assumed to be 1)
                            displayStr = displayStr + " + x<sup>" + i + "</sup>";
                        }
                    }
                }
            }

            return displayStr;
        }

        for (let i = 0; i < pCoeffs.length; i++) {
            coeffs.push(pCoeffs[i]);
        }

        return {
            getCoeffs: getCoeffs,
            getVPlus: getVPlus,
            getVMinus: getVMinus,
            getDisplayPolynomial: getDisplayPolynomial
        };
    })(pCoeffs);

    return Polynomial;
}
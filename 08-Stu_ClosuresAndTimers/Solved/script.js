function getIsPrimeFunc() {
	const knownPrimes = new Set([2, 3, 5, 7, 9, 11, 13, 17, 19, 23, 29]);
	const incr = [6, 4, 2, 4, 2, 4, 6, 2];
	
	function isPrime(num) {
		if (num === 1) return false;
		if (num < 0) num = -num;

        // We know that every positive integer between 2 and 31
		// is either prime or not. If it is contained in knownPrimes 
		// then it is prime, otherwise it is not.
		if (knownPrimes.has(num)) {
			return true;
		} else if (num < 31) {
			return false;
		}

		for (let prime of knownPrimes) {
			if ((num % prime) === 0) {
				return false;
			}
		}

		const limit = Math.floor(Math.sqrt(num));
		let possDiv = 31;
		let i = 0;
		while (possDiv < limit) {
			if ((num % possDiv) === 0) {
				return false;
			}
			possDiv = possDiv + incr[i];
			i = i + 1;
			if (i >= incr.length) {
				i = 0;
			}
		}
		knownPrimes.add(num);
		return true;
	}
	
	return isPrime;
}

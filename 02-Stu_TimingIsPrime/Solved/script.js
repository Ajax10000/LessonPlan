function getIsPrimeFunc() {
	const knownPrimes = new Set([2, 3]);
	
	function isPrime(num) {
		if (num === 1) return false;
		if (num < 0) num = -num;

		if (knownPrimes.has(num)) { 
			return true;
		}
        
        for(let prime of knownPrimes) {
            if ((num % prime) === 0) {
                return false;
            }
        }
		
		const limit = Math.floor(Math.sqrt(num));
		// If here, then num is not divisible by 2 nor 3.
		// In particular, num is an odd number.
		// Now we can divide by 5 and increasing odd numbers until possDiv > limit
		let possDiv = 5;
		while (possDiv < limit) {
			if ((num % possDiv) === 0) {
				return false;
			}
			possDiv = possDiv + 2;
		}
		knownPrimes.add(num);
		return true;
	}
	
	return isPrime;
}
# Introduction 

Assumptions:
* Student is familiar with basic JavaScript statements (if, assignment, return, const, let, etc.)
* Student is familiar with functions, and knows that functions can be defined within functions .
* Student is familiar with Set objects.

* This lesson uses the HTML5 output element. If the students have not used it before, you may want to remind them a day before class to review the site at https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output.

* This lesson also uses a function that implements Descartes' Rule of Signs. This method is commonly taught in high school, often in 7th grade. It is strongly recommended that you tell them to review Descartes' Rule of Signs for today's class; see https://www.mathplanet.com/education/algebra-2/polynomial-functions/descartes-rule-of-sign.

## Lesson Plan - Closures
### Introduction
* Go to the 01-Ins_IsPrime folder. Display the 01-Ins_IsPrime webpage on your browser so students can see the output. Explain that the primes are not hard-coded into the webpage, but are determined with the code inside the script.js file.

* Have the students open the script.js file. Point out that within the getIsPrimeFunc the variable knownPrimes is defined, and also a function named isPrime. The function isPrime is using the knownPrimes variable defined in the outer function getIsPrimeFunc.

```
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
```

* Explain how the isPrime function works. A prime is defined as a positive integer greater than 1 that is divisible only by itself and 1. Hence 1 is not a prime (a prime must be greater than 1). 

* The function first checks if the argument num is contained within the set knownPrimes. If it is, then it is a prime and it returns true.

* Otherwise it divides the argument num by the primes in set knownPrimes. If it is divisible by a known prime, then num is not a prime.

* It will then attempt to divide the agument num by the possDivisor (possible divisor), which is set to odd integers >= 5. However it first determines an upper limit to the the value possDivisor. It is not necessary to try dividing by any numbers greater than limit. As we try to express num as num = a*b, we start with low values for a and increase the value of a. As we do so, the value of b decreases. When a = sqrt(n), a and b have the same value. When a > sqrt(num), the value of b is lower than a. So any value that the factor b takes on would have already been taken by a.

* Ask the students how they would save these primes into a file for later processing.

* ** Answer**: Save the webpage or copy and paste the primes into a new text file.

* Ask the students if the output of these primes could be used to improve the prime finding function.

* ** Answer **: Yes, by copying these primes into the knownPrimes variable.

* An interesting fact about the function isPrime is that once it determines that a number is prime, asking if that number is prime again will be determined in constant time! It will not go through the while loop trying possible divisors. This is possible through a feature of JavaScript known as closure. 

* A closure is defined as a function together with the references to variables in its lexical environment. In our case, function isPrime has access to the Set object knownPrimes, and this variable knownPrimes exists even after the function getIsPrimeFunc returns. 

* Once we know that a numbe is a prime, it is added to the set knownPrimes. This process, of storing computed results from previous function invocations that can be used by future invocations of the same function, is known as memoization. This is not a misspelling, it is memoization (and NOT memorization).

* JavaScript does not have what is known as static function variables in other languages like C. Static variables defined in a function retain their values from invocation to invocation. What this means is, if a function defines a static variable, and the last time that function the static variable had the value v, then the next time that function is called, it will still have the value v. It can, of course, change the value of the static variable - it will have this new value the next time the function is called. JavaScript does have closures, and with it, static variables can be mimicked in JavaScript. Other programming languages also support closures, including Swift and Ruby.

[Note to instructors: Java and C# have a static keyword, however that is NOT used to create static function variables. It is used to create static class members, which are shared among all instances of a class.]

* So what can we use closures for? They are used mainly for:
  * Memoization
  * Data Hiding
  * Providing data to Callbacks and Timers
  * Implementing the Module Pattern

### Student Do (Optional)
* Slack out the file and the instructions below.

  * **FILE**
    * `primes.html` in `02-Stu_TimingIsPrime/Unsovled`

  * **Instructions**
  * Add code to get the timedPrimeFinder function. It should:
    1. Get the time just before calling checkIntegersUpTo. 
    2. Call the checkIntegersUpTo
    3. Get the time just after calling checkIntegersUpTo. 
    4. Subtract the time before from the time after, to get the elapsed time
    5. Display the elapsed time

  * Use the statement `new Date().getTime()` to get the time.

 * Did the time improve? If so, why did it improve?



### Instructor Do: Review Activity
* Review `primes.html` in '02-Stu_TimingIsPrime/Solved`.

```js
	function checkIntegersUpTo(myLimit) {
		let firstPrimeOutputAlready = false;
		for (let i = 1; i <= myLimit; i++) {
			let isPrime = isPrimeFunc(i);
			// output prime
			if (isPrime && firstPrimeOutputAlready) {
				primeOutput.value = primeOutput.value + ", " + i;
			} else if (isPrime) {
				primeOutput.value = "" + i;
				firstPrimeOutputAlready = true;
			}
		}
	}

	function timedPrimeFinder() {
		let timeStart = new Date().getTime();
		checkIntegersUpTo(1000);
		let timeEnd = new Date().getTime();
		let timeElapsed = timeEnd - timeStart; // ms
		let pElem = document.createElement("p");
		pElem.textContent ="Elapsed time in = " + timeElapsed + " ms.";
		primeOutput.appendChild(pElem);
	}

	const isPrimeFunc = getIsPrimeFunc();
	let primeOutput = document.getElementById("primeOutput01");
	
	// Run first time
	timedPrimeFinder();

	// Run second time
	primeOutput = document.getElementById("primeOutput02");
	timedPrimeFinder();
```

* Tell students that the largest integer that JavaScript supports is Number.MAX_SAFE_INTEGER. If students need a larger range of integers, they can use integers of the BigInt type. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt.

### 1. Instructor Do: Memoization 
** Memoization - Storing Previously Computed Values
* JavaScrirpt's closure feature can be useful when you want to store information that can take a long time to compute or otherwise determine. It also is useful in hiding information that you want only one function to have access to. For example, only function isPrime has access to the knownPrimes variable. No other external function can access the knownPrimes variable.

* As an example, consider the following modification of the code above. It uses an array of increments which are used to avoid generating values of possDiv that are multiples of 2, 3 and 5. It works like this. First note that 2*3*5 = 30. Consider the numbers and break them into multiples of 30. Note that some of these numbers are always composite (hence not prime). When dividing a number to see if it is prime or composite, the best case we can have is that we divide only by prime numbers. For example, there's no point in dividing a number by 4 to see if it is prime if we've already divided it by 2. We can't do store all the prime numbers, but we can at least divide by numbers we know have a good chance of being prime because they are not divisible by 2, 3, nor 5.

 1     31     61      91  
 2     32     62      92  //  2, 32, 62, and  92 are all divisible by 2
 3     33     63      93  //  3, 33, 63, and  93 are all divisible by 3
 4     34     64      94  //  4, 34, 64, and  94 are all divisible by 2
 5     35     65      95  //  5, 35, 65, and  95 are all divisible by 5
 6     36     66      96  //  6, 36, 66, and  96 are all divisible by 2 (and 3)
 7     37     67      97  
 8     38     68      98  //  8, 38, 68, and  98 are all divisible by 2
 9     39     69      99  //  9, 39, 69, and  99 are all divisible by 3
10     40     70     100  // 10, 40, 70, and 100 are all divisible by 2 (and 5)
11     41     71     101  
12     42     72     102  // 12, 42, 72, and 102 are all divisible by 2 (and 3)
13     43     73     103
14     44     74     104  // 14, 44, 74, and 104 are all divisible by 2
15     45     75     105  // 15, 45, 75, and 105 are all divisible by 5 (and 3)
16     46     76     106  // 16, 46, 76, and 106 are all divisible by 2
17     47     77     107
18     48     78     108  // 18, 48, 78, and 108 are all divisible by 2 (and 3)
19     49     79     109  
20     50     80     110  // 20, 50, 80, and 110 are all divisible by 2 (and 5)
21     51     81     111  // 21, 51, 81, and 111 are all divisible by 3
22     52     82     112  // 22, 52, 82, and 112 are all divisible by 2
23     53     83     113
24     54     84     114  // 24, 54, 84, and 114 are all divisible by 2 (and 3)
25     55     85     115  // 25, 55, 85, and 115 are all divisible by 5
26     56     86     116  // 26, 56, 86, and 116 are all divisible by 2
27     57     87     117  // 27, 57, 87, and 117 are all divisible by 3
28     58     88     118  // 28, 58, 88, and 118 are all divisible by 2
29     59     89     119
30     60     90     120  // 40, 60, 90, and 120 are all divisible by 2 (and 3 and 5)

* With this data, we can create an array of increments that skips numbers that are multiples of 2, 3 or 5.
In particular, we are interested in the increments between the numbers 31, 37, 41, 43, 47, 49, 53, 59 and 61.
The increments between these successive numbers are: 6, 4, 2, 4, 2, 4, 6 and 2.

* Now we can write an improved isPrime function. Unlike the old one, which avoided dividing by even numbers, this one avoids dividing by multiples of 2, 3 and 5.

```js
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
```


### Student Do: Memoization 
* Direct students to the next activity, found in [04-Stu_IsPrimeImproved/Unsolved]

* The improved prime finding method in the instructor's activity can be extended and improved further. The code in the instructor's activity avoided dividing by multiples of 2, 3, and 5. Using the following data, you can avoid dividing by multiples of 2, 3, 5, 7 and 11.  Use the following data to improve the prime finding method in script.js.

```js
const knownPrimes = new Set([    
			2,    3,    5,    7,   11,   13,   17,   19,   23,   29,   31,   37,
	       41,   43,   47,   53,   59,   61,   67,   71,   73,   79,   83,   89,
	       97,  101,  103,  107,  109,  113,  127,  131,  137,  139,  149,  151,
	      157,  163,  167,  173,  179,  181,  191,  193,  197,  199,  211,  223,
	      227,  229,  233,  239,  241,  251,  257,  263,  269,  271,  277,  281,
	      283,  293,  307,  311,  313,  317,  331,  337,  347,  349,  353,  359,
	      367,  373,  379,  383,  389,  397,  401,  409,  419,  421,  431,  433,
	      439,  443,  449,  457,  461,  463,  467,  479,  487,  491,  499,  503,
	      509,  521,  523,  541,  547,  557,  563,  569,  571,  577,  587,  593,
	      599,  601,  607,  613,  617,  619,  631,  641,  643,  647,  653,  659, 
	      661,  673,  677,  683,  691,  701,  709,  719,  727,  733,  739,  743,
	      751,  757,  761,  769,  773,  787,  797,  809,  811,  821,  823,  827,
	      829,  839,  853,  857,  859,  863,  877,  881,  883,  887,  907,  911,
	      919,  929,  937,  941,  947,  953,  967,  971,  977,  983,  991,  997,
	     1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 
	     1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163,
	     1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249,
	     1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321,
	     1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439,
	     1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 
	     1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601,
	     1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693,
	     1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783,
	     1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877,
	     1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 
	     1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069,
	     2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143,
	     2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267,
	     2269, 2273, 2281, 2287, 2293, 2297, 2309
	    ]);
	    
const incr = [
		 2, 12,  4,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  
		 2,  4, 14,  4,  6,  2, 10,  2,  6,  6,  4,  2,  4,  6,  2, 10,  2,  4,  2, 12, 10,  2,  4,  2,  
		 4,  6,  2,  6,  4,  6,  6,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  6,  8,  6, 10,  2, 
		 4,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2,  6, 10,  2, 10,  2,  4,  2,  4,  6,  8,  4, 
		 2,  4, 12,  2,	 6,  4,  2,  6,  4,  6, 12,  2,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,
		10,  2,  4,  6,  2,	 6,  4,  2,  4,  2, 10,  2, 10,  2,  4,  6,  6,  2,  6,  6,  4,  6,  6,  2,
		 6,  4,  2,  6,  4,  6,  8,  4,  2,  6,  4,  8,  6,  4,  6,  2,  4,  6,  8,  6,  4,  2, 10,  2, 
		 6,  4,  2,  4,  2, 10,  2, 10,  2,  4,  2,  4,  8,  6,  4,  2,  4,  6,  6,  2,  6,  4,  8,  4, 
		 6,  8,  4,  2,  4,  2,  4,  8,  6,  4,  6,  6,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2, 
		 4,  2, 10,  2, 10,  2,  6,  4,  6,  2,  6,  4,  2,  4,  6,  6,  8,  4,  2,  6, 10,  8,  4,  2, 
		 4,  2,  4,  8, 10,  6,  2,  4,  8,  6,  6,  4,  2,  4,  6,  2,  6,  4,  6,  2, 10,  2, 10,  2, 
		 4,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6,  6,  6,  4,  6,  8,  4,  2,  4,  2,  4,  8, 
		 6,  4,  8,  4,  6,  2,  6,  6,  4,  2,  4,  6,  8,  4,  2,  4,  2, 10,  2, 10,  2,  4,  2,  4, 
		 6,  2, 10,  2,  4,  6,  8,  6,  4,  2,  6,  4,  6,  8,  4,  6,  2,  4,  8,  6,  4,  6,  2,  4, 
		 6,  2,  6,  6,  4,  6,  6,  2,  6,  6,  4,  2, 10,  2, 10,  2,  4,  2,  4,  6,  2,  6,  4,  2, 
		10,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  2, 12,  6,  4,  6,  2,  4,  6,  2, 12,  4, 
		 2,  4,  8,  6,  4,  2,  4,  2, 10,  2, 10,  6,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6, 
		 4,  2, 10,  6,  8,  6,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,  6,  6,  4,  6,  2,  6, 
		 4,  2,  4,  2, 10, 12,  2,  4,  2, 10,  2,  6,  4,  2,  4,  6,  6,  2, 10,  2,  6,  4, 14,  4, 
		 2,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2,  4, 12
		];
```

### Instructor: Review Activity
* Review 'script.js' in '04-Stu_IsPrimeImproved/Solved'.

```js
function getIsPrimeFunc() {
	const knownPrimes = new Set([    
		2,    3,    5,    7,   11,   13,   17,   19,   23,   29,   31,   37,
	   41,   43,   47,   53,   59,   61,   67,   71,   73,   79,   83,   89,
	   97,  101,  103,  107,  109,  113,  127,  131,  137,  139,  149,  151,
	  157,  163,  167,  173,  179,  181,  191,  193,  197,  199,  211,  223,
	  227,  229,  233,  239,  241,  251,  257,  263,  269,  271,  277,  281,
	  283,  293,  307,  311,  313,  317,  331,  337,  347,  349,  353,  359,
	  367,  373,  379,  383,  389,  397,  401,  409,  419,  421,  431,  433,
	  439,  443,  449,  457,  461,  463,  467,  479,  487,  491,  499,  503,
	  509,  521,  523,  541,  547,  557,  563,  569,  571,  577,  587,  593,
	  599,  601,  607,  613,  617,  619,  631,  641,  643,  647,  653,  659, 
	  661,  673,  677,  683,  691,  701,  709,  719,  727,  733,  739,  743,
	  751,  757,  761,  769,  773,  787,  797,  809,  811,  821,  823,  827,
	  829,  839,  853,  857,  859,  863,  877,  881,  883,  887,  907,  911,
	  919,  929,  937,  941,  947,  953,  967,  971,  977,  983,  991,  997,
	 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 
	 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163,
	 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249,
	 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321,
	 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439,
	 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 
	 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601,
	 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693,
	 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783,
	 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877,
	 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 
	 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069,
	 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143,
	 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267,
	 2269, 2273, 2281, 2287, 2293, 2297, 2309
	]);
	
	const incr = [
	 2, 12,  4,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  
	 2,  4, 14,  4,  6,  2, 10,  2,  6,  6,  4,  2,  4,  6,  2, 10,  2,  4,  2, 12, 10,  2,  4,  2,  
	 4,  6,  2,  6,  4,  6,  6,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  6,  8,  6, 10,  2, 
	 4,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2,  6, 10,  2, 10,  2,  4,  2,  4,  6,  8,  4, 
	 2,  4, 12,  2,	 6,  4,  2,  6,  4,  6, 12,  2,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,
	10,  2,  4,  6,  2,	 6,  4,  2,  4,  2, 10,  2, 10,  2,  4,  6,  6,  2,  6,  6,  4,  6,  6,  2,
	 6,  4,  2,  6,  4,  6,  8,  4,  2,  6,  4,  8,  6,  4,  6,  2,  4,  6,  8,  6,  4,  2, 10,  2, 
	 6,  4,  2,  4,  2, 10,  2, 10,  2,  4,  2,  4,  8,  6,  4,  2,  4,  6,  6,  2,  6,  4,  8,  4, 
	 6,  8,  4,  2,  4,  2,  4,  8,  6,  4,  6,  6,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2, 
	 4,  2, 10,  2, 10,  2,  6,  4,  6,  2,  6,  4,  2,  4,  6,  6,  8,  4,  2,  6, 10,  8,  4,  2, 
	 4,  2,  4,  8, 10,  6,  2,  4,  8,  6,  6,  4,  2,  4,  6,  2,  6,  4,  6,  2, 10,  2, 10,  2, 
	 4,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6,  6,  6,  4,  6,  8,  4,  2,  4,  2,  4,  8, 
	 6,  4,  8,  4,  6,  2,  6,  6,  4,  2,  4,  6,  8,  4,  2,  4,  2, 10,  2, 10,  2,  4,  2,  4, 
	 6,  2, 10,  2,  4,  6,  8,  6,  4,  2,  6,  4,  6,  8,  4,  6,  2,  4,  8,  6,  4,  6,  2,  4, 
	 6,  2,  6,  6,  4,  6,  6,  2,  6,  6,  4,  2, 10,  2, 10,  2,  4,  2,  4,  6,  2,  6,  4,  2, 
	10,  6,  2,  6,  4,  2,  6,  4,  6,  8,  4,  2,  4,  2, 12,  6,  4,  6,  2,  4,  6,  2, 12,  4, 
	 2,  4,  8,  6,  4,  2,  4,  2, 10,  2, 10,  6,  2,  4,  6,  2,  6,  4,  2,  4,  6,  6,  2,  6, 
	 4,  2, 10,  6,  8,  6,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,  6,  6,  4,  6,  2,  6, 
	 4,  2,  4,  2, 10, 12,  2,  4,  2, 10,  2,  6,  4,  2,  4,  6,  6,  2, 10,  2,  6,  4, 14,  4, 
	 2,  4,  2,  4,  8,  6,  4,  6,  2,  4,  6,  2,  6,  6,  4,  2,  4,  6,  2,  6,  4,  2,  4, 12
	];
	
	function isPrime(num) {
		if (num === 1) return false;
		if (num < 0) num = -num;

        // We know that every positive integer between 2 and 31
		// is either prime or not. If it is contained in knownPrimes 
		// then it is prime, otherwise it is not.
		if (knownPrimes.has(num)) {
			return true;
		} else if (num < 2311) {
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
```

### Instructor Do: Module Pattern
* You will often in your code want to keep your class properties hidden from the user so that no one can mess up the internal state of your class. If a person could modify the internal state of your class, they could accidentally or deliberately create chaos by corrupting the internal state of your class. 

* Put simply, you want control of your class's internal state, and should not trust the user to modify it. This is also the reason you do not want to give the user a reference to an internal variable, but instead give them a copy of an in internal variable. The user can modify the copy - it will not affect your class's internal state. In other languages like Java, that is typically done by creating private variables that are not accessible by code outside the class. If the user needs access to that private variable, they provide getter method that returns a copy of the private variable, and/or a setter method to set the private variable to a given value.

* Suppose you have a polynomial, and you have calculated some properties of this polynomial. You do not want anyone to modify these calculated values. You know it is the correct calculated values, and don't want anyone modifying them. Let's consider a concrete example. You may remember from high school algebra that you can, using Descartes' Rule of Signs, calculate an upper limit to the number of positive roots in a polynomial by calculating V+ to be the number of sign changes in your polynomial p(x). Also, you can calculate a lower limit to the number of negative roots in a polynomial by calculating V- to be the number of sign changes in the polynomial p(-x).

* The following uses the modular pattern to implement private variables. The modular pattern is also often used to implement JavaScript libraries. These libraries return an object, which the user can then name. The library does not use a predetermined name, which might be the same as a variable name the user is already using. This avoids clobbering an already used name.

```js
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

    // Set Polynomial to the return value of our IIFE
    let Polynomial = (function(pCoeffs) {
        // Our private properties:
        let coeffs = [];
        let vPlus, vMinus;

        // It is a convention in JavaScript to give methods that are meant to 
        // be private a name that starts with the underscore (_) character.

        // Use Descartes's rule of signs to calculate vPlus
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

        // Use Descartes's rule of signs to calculate vMinus
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
                // Use private method to calculate vPlus
                _calculateVPlus();
            }
            return vPlus;
        }

        function getVMinus() {
            if (vMinus === undefined) {
                // Use private method to calculate vMinus
                _calculateVMinus();
            }
            return vMinus;
        }

        for (let i = 0; i < pCoeffs.length; i++) {
            coeffs.push(pCoeffs[i]);
        }

        return {
            getCoeffs: getCoeffs,
            getVPlus: getVPlus,
            getVMinus: getVMinus
        };
    })(pCoeffs);


    return Polynomial;
}
```

* Ask the students if the parameter checks should be done in getPolynomialObject or in the IIFE. 

* ** Answer**: A coding principle of defensive programming is that parameters should be checked before using them.
By doing the parameter checks in getPolynomialObject, we can avoid doing it multiple times.

* Ask the students if the code checks if each element of the pCoeffs array is a number.

* ** Answer**: It does not. This will not affect the construction of the polynomial. 

* Ask students what happens when JavaScript returns when the result of an integer multiplication exceeds the maximum integer value that JavaScript can represent? Ask students to do a Google search on Number.MAX_SAFE_INTEGER, Number.POSITIVE_INFINITY and Number.NEGATIVE_INFINITY. Finally, have them look at the Examples section of  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY.


### Student Do: Module Pattern
* Direct students to the next activity, found in [06-Stu_PrivateVariables/Unsolved]

  * **Instructions**
  * Add code to get the getPolynomialObject function and IIFE. It should:
    1. In getPolynomailObject add another parameter check inside of getPolynomial object that checks to see that each element in pCoeffs is an integer. Use the Number.isInteger method. If any array element in pCoeffs is not an integer, throw an Exception with an appropriate message.

    2. When calculating vPlus and vMinus in the IIFE, we multiply coefficients together. If both coefficients are large, they may generate the value Infinity. We can prevent that by just multiplying the signs of the coefficients. The sign of a positive coefficient is 1. The sign of a negative coefficient is -1. Use the Math.sign() method to modify methods _calculateVPlus and _calculateVMinus and avoid integer overflow.

    3. (Bonus) Add a function named getDisplayPolynoial to the IIFE which returns a string in which the polynomial is represented in HTML format in the form a + bx + cx^2 + ... + ex^n. Use the <sup> element to display superscripts. For example x^2 is displayed with `x<sup>2</sup>` and x^4 is displayed with `x<sup>4</sup>`. You will probably treat the constant coefficient differently, as no variable appears next to the constant coefficient. You will probably also wanat to treat the linear coefficient, as its exponent is 1. However, as x is the same as x^1, it is best to display the variable as just x.

    This activity will involve adding a property called getDisplayPolynomial to the object literal returned in the IIFE of the last instructor activity.
        let Polynomial = {
            getCoeffs: getCoeffs,
            getVPlus: getVPlus,
            getVMinus: getVMinus,
			getDisplayPolynomial: getDisplayPolynomial // <-- Need to add this
        }
		
	To see if it works, you'll have to call the getDisplayPolynomial method from the JavaScript code in polynomials.html.

### Instructor Do: Review Activity
* Review 'prime.html' and 'script.js' in `05-Stu_PrivateVariables`.

1. Parameter check added to getPolynomialObject function:
	```js
    for (let i = 0; i < pCoeffs.length; i++) {
        if (!Number.isInteger(pCoeffs[i])) {
            throw new Exception("All elements of array passed in must be integers.")
        }
    }
	```

	Note that Number.isInteger(Number.POSITIVE_INFINITY) returns false, as do Number.isInteger(Number.NEGATIVE_INFINITY), Number.isInteger(Infinity), Number.isInteger(Number.NaN) and Number.isInteger(NaN).
	
2. Modifications to _calculateVPlus and _calculateVMinus in IIFE. Notice the use of Math.sign.
	```js
	function _calculateVPlus() {
		let nonZeroCoeffs = [];
		let j = 0;

		// coeffs holds the coefficients of our polynomial p(x)
		// nonZeroCoeffs holds the non-zero coefficients of p(x)
		for (let i = 0; i < coeffs.length; i++) {
			if (coeffs[i] !== 0) {
				nonZeroCoeffs[j] = Math.sign(coeffs[i]);  // <== Using Math.sign here
				j++;
			}
		}

		vPlus = 0;
		for (let i = 0; i < nonZeroCoeffs.length - 1; i++) {
			if ((nonZeroCoeffs[i]*nonZeroCoeffs[i+1]) < 0) { // Multiplying +/-1 by +/-1 here, no overflow will result
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
					nonZeroCoeffs[j] = Math.sign(coeffs[i]); <== Using Math.sign here
				} else {
					nonZeroCoeffs[j] = Math.sign(-coeffs[i]); <== Using Math.sign here
				}
				j++;
			}
		}

		vMinus = 0;
		for (let i = 0; i < nonZeroCoeffs.length - 1; i++) {
			if ((nonZeroCoeffs[i]*nonZeroCoeffs[i+1]) < 0) { // Multiplying +/-1 by +/-1 here, no overflow will result
				vMinus++;
			}
		}
	}
	```
	
3. Bonus - adding getDisplayPolynomial method to IIFE
   Modifications to IIFE:
   ```js
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
	```

	And the modifications to the JavaScript code in polynomials.html for the Bonus points:
	```js
	// Create a polynomial object
	const poly01 = getPolynomialObject([1, -1, 3]); // = 1 - x + 3x^2
	// Get some of its properties
	const coeffs = poly01.getCoeffs();
	const coeffsAsHTML = poly01.getDisplayPolynomial();
	const vPlus = poly01.getVPlus(); // vPlus = 2
	const vMinus = poly01.getVMinus(); // p(-x) = 1 + x + 3x^2, so vMinus = 0
	
	// Display the polynomial properties in the output element
	const outputElem = document.getElementById("polyOutput");
	outputElem.innerHTML = "Polynomial coefficients = " + coeffs + "<br />" + 
		"as HTML = " + coeffsAsHTML + "<br />" + 
		"vPlus = " + vPlus + "<br />" +
		"vMinus = " + vMinus;
	```
				
### Instructor Do: Timers and Closures
* A potential problem you may run into is you have a long running JavaScript function. It may be so long running that the browser halts it or asks if you want to stop it. 

* You can help prevent this by implementing a timer which calls your JavaScript function after 0 seconds. This will immediately put the JavaScript function on the event queue, where the JavaScript event loop will get to it eventually after the other code has executed.

The code below uses this idea to call a timer which will place a function that calculates primes into the event queue.
```js
	const primeOutput = document.getElementById("primeOutput");
	const isPrimeFunc = getIsPrimeFunc();
	let firstPrimeOutputAlready = false;

	// This function will try to check to see if all integers from 
	// myLowerLimit to myUpperLimit are primes. 
	function checkIntegersFromTo(myLowerLimit, myUpperLimit) {
		if (!Number.isInteger(myLowerLimit)) {
			let errMsg = "First parameter must be an integer";
			console.log(errMsg);
			throw new Exception(errMsg);
		}
		if (!Number.isInteger(myUpperLimit)) {
			let errMsg = "Second parameter must be an integer";
			console.log(errMsg);
			throw new Exception(errMsg);
		}

		let i;
		for (i = myLowerLimit; i <= myUpperLimit; i++) {
			let isPrime = isPrimeFunc(i);
			// output prime
			if (isPrime && firstPrimeOutputAlready) {
				primeOutput.value = primeOutput.value + ", " + i;
			} else if (isPrime) {
				primeOutput.value = "" + i;
				firstPrimeOutputAlready = true;
			}
		}
	} 

	function callNoBlockPrimeFinder(myLowerLimit, myUpperLimit) {
		// This setTimeout will place its first argument (a function) 
		// into the event queue. 
		setTimeout(function() {
			checkIntegersFromTo(myLowerLimit, myUpperLimit);
			}, 0);
	} 

	callNoBlockPrimeFinder(1, 5000);
```

* Display the webpage on a browser so the class can see the results.

### Students Do: Timers and Closures
* Direct students to the next activity, found in [08-Stu_ClosuresAndTimers/Unsolved]
  * **Instructions**
  * This is a difficult activity, so don't be upset if you don't get to finish it during class. 
    1. Remove the lower and upper parameters to the callNoBlockPrimeFinder function.
    2. Add an array named limits to the function given as the first argument to setTimeout:
```js
	const limits = [
		[1, 1000],
		[1001, 2000],
		[2001, 3000],
		[3001, 4000],
		[4001, 5000]
	];
```

    3. Create a variable to use as an index iIdx into the limits array, initialize it to 0.
    4. Call checkIntegersFromTo using as arguments the first and second of the element pointed to by limits[iIdx].
    5. After the call, increment iIdx.
    6. If iIdx is still less than limits.length, call callNoBlockPrimeFinder recursively.

### Instructor Do: Review Activity
* Review 'primesAndTimers.html' and 'script.js' in `08-Stu_ClosuresAndTimers/Solved`.

```js
            const primeOutput = document.getElementById("primeOutput");
            const isPrimeFunc = getIsPrimeFunc();
            let firstPrimeOutputAlready = false;

            // This function will try to check to see if all integers from 
            // myLowerLimit to myUpperLimit are primes. 
            function checkIntegersFromTo(myLowerLimit, myUpperLimit) {
                if (!Number.isInteger(myLowerLimit)) {
                    let errMsg = "First parameter must be an integer";
                    console.log(errMsg);
                    throw new Exception(errMsg);
                }
                if (!Number.isInteger(myUpperLimit)) {
                    let errMsg = "Second parameter must be an integer";
                    console.log(errMsg);
                    throw new Exception(errMsg);
                }

                let i;
                for (i = myLowerLimit; i <= myUpperLimit; i++) {
                    let isPrime = isPrimeFunc(i);
                    // output prime
                    if (isPrime && firstPrimeOutputAlready) {
                        primeOutput.value = primeOutput.value + ", " + i;
                    } else if (isPrime) {
                        primeOutput.value = "" + i;
                        firstPrimeOutputAlready = true;
                    }
                }
            } 

            let iIdx = 0;
            function callNoBlockPrimeFinder() {
                // This setTimeout will place its first argument (a function) 
                // into the event queue. 
                setTimeout(function() {
                    const limits = [
                        [1, 1000],
                        [1001, 2000],
                        [2001, 3000],
                        [3001, 4000],
                        [4001, 5000]
                    ];
                    let twoElemArray = limits[iIdx];
                    let lLimit = twoElemArray[0];
                    let uLimit = twoElemArray[1];
                    checkIntegersFromTo(lLimit, uLimit);
                    iIdx++;
                    if (iIdx < limits.length) {
                        callNoBlockPrimeFinder();
                    }
                }, 0);
            } 

            callNoBlockPrimeFinder();
```


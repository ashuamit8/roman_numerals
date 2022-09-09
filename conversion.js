
let MAX = 4000

let hashData = { //basedOnDigit : Right->Left
    "0": ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'],
    "1": ['X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'],
    "2": ['C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'],
    "3": ['M', 'MM', 'MMM']
}


const romanEquivalentNumber = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};


var isValidRoman = (s) => {
    // regex pattern
    const p2 = /^(?=[MDCLXVI])M*(C[MD]|D?C*)(X[CL]|L?X*)(I[XV]|V?I*)$/
    // const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
    return p2.test(s);
};

var romanToInteger = (roman) => {
    // console.log("romanToInteger==");
    if (!isValidRoman(roman)) { return false }

    let num = 0;

    for (let i = 0; i < roman.length; i++) {
        if (romanEquivalentNumber[roman[i]] < romanEquivalentNumber[roman[i + 1]]) {
            //assuming if next is bigger then substraction 
            num += romanEquivalentNumber[roman[i + 1]] - romanEquivalentNumber[roman[i]];
            i++;
        } else {
            num += romanEquivalentNumber[roman[i]];
        }
    }
    // console.log(num);
    return (num >= MAX) ? undefined : num

}

var integerToRoman = (num) => {
    // console.log("integerToRoman==", num);
    let roman = ''
    if (num > 0 && num < MAX) {
        let n = num
        let digits = []
        while (n) {
            digits.push(n % 10);
            n = parseInt(n / 10)
        }
        // console.log(digits);

        //digits : 
        for (let i = digits.length - 1; i >= 0; i--) { // 1234 : [4,3,2,1] //largest at end : thus traversing reverse
            //as roman calculation work from largest to smallest
            if (hashData[i][digits[i] - 1]) {
                roman += hashData[i][digits[i] - 1]
            }

        }
        // console.log(roman);
        return roman
    } else {
        return undefined
    }

}

var helper = (val) => {
    if (!val) {
        return
    } else {
        let type = typeof val
        switch (type) {
            case 'string':
                return (val == 'nulla') ? undefined : romanToInteger((val.toUpperCase()))
                break;
            case 'number':
                return integerToRoman(val)
                break;
            default:
                return //default
                break;
        }
    }
}


//pass single value to test :
// console.log(helper(3940));//MMMCMXL
// console.log(helper('xciii'));//93
// console.log(helper('lxxxix'));//89 isValidRoman:rejex

module.exports = { helper }
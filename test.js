var { testData } = require("./test_data")
var { helper } = require("./conversion")

var testCorrectness = (inputArr) => {
    let count_total = inputArr.length
    let count_t = 0
    let count_f = 0
    let result = inputArr.map(val => {
        let res = helper(val)
        if (!res || (res && (testData[val] == res || testData[res] == val))) {
            if (!res) { count_f += 1 }
            count_t += 1
            return res
        }
    });

    return {
        passed: `Passed ${count_t} / ${count_total} with ${count_f} outOfRange or WrongInput`,
        // result: result
    }
}

//test:1
var inputArr = Object.values(testData)
console.log(testCorrectness(inputArr))

//test:2
var inputArr = (Object.keys(testData)).map(x => parseInt(x))
console.log(testCorrectness(inputArr))

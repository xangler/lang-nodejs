const LETTERS = /[a-z]/i
const WHITESPACE = /\s/
const NUMBERS = /\d/
module.exports = function tokenizer(input) {
    const tokens = []
    let current = 0
    while (current < input.length) {
        let char = input[current]
        if (char === "(" || char === ")"){
            tokens.push({
                type: "paren",
                value: char
            })
            current = current + 1
        }
        else if (LETTERS.test(char)){
            let value = ""
            while (LETTERS.test(char)){
                value = value + char
                current = current + 1
                char = input[current]
            }
            tokens.push({
                type: "name",
                value: value
            })
        }
        else if (WHITESPACE.test(char)){
            current = current + 1
        }
        else if (NUMBERS.test(char)){
            let value = ""
            while (NUMBERS.test(char)){
                value = value + char
                current = current + 1
                char = input[current]
            }
            tokens.push({
                type: "number",
                value: value
            })
        }
        else {
            throw new TypeError(`Unknown char: '${char}'`)
        }
    }
    return tokens
}
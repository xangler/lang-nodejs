module.exports = function parser(tokens) {
    let current = 0
    function walk() {
        let token = tokens[current]
        if (token.type === "number"){
            current = current + 1
            return {
                type: "NumberLiteral",
                value: token.value
            }
        }
        else if(token.type === "paren" && token.value === "("){
            current = current + 1
            token = tokens[current]
            const expression = {
                type: "CallExpression",
                name: token.value,
                params: []
            }
            current = current + 1
            token = tokens[current]
            while (token.value !== ")") {
                expression.params.push(walk())
                token = tokens[current]
            }
            current = current + 1
            return expression
        }
        else {
            throw new TypeError(`Unknown token: '${token.type}'`)
        }
    }
    const ast = {
        type: "Program",
        body:[walk()]
    }
    return ast
}
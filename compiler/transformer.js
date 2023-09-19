const traverse = require("./traverse")
module.exports = function transformer(orgAST) {
    const jsAST = {
        type: "Program",
        body: []
    }
    let position = jsAST.body
    traverse(orgAST, {
        NumberLiteral(node){
            position.push({
                type: "NumericLiteral",
                value: node.value
            })
        },
        CallExpression(node, parent){
            let expression = {
                type: "CallExpression",
                callee:{
                    type: "Identifier",
                    name: node.name
                },
                arguments: []
            }
            const prevPosition = position
            position = expression.arguments
            if (parent.type !== "CallExpression"){
                expression = {
                    type: "ExpressionStatement",
                    expression: expression
                }
            }
            prevPosition.push(expression)
        }
    })
    return jsAST
}
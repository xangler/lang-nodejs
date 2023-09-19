module.exports = function generateCode(node) {
    if (node.type === "NumericLiteral"){
        return node.value
    }
    else if (node.type === "Identifier"){
        return node.name
    }
    else if (node.type === "CallExpression"){
        return `${generateCode(node.callee)}(${node.arguments.map(generateCode).join(', ')})`
    }
    else if (node.type === "ExpressionStatement"){
        return `${generateCode(node.expression)};`
    }
    else if (node.type == "Program"){
        return node.body.map(generateCode).join("\n")
    }
    else{
        throw new TypeError(`Unknown jsAST node type: '${node.type}'`)
    }
}
import {parser} from "lezer-python"
import {continuedIndent, indentNodeProp, foldNodeProp, LezerSyntax} from "@codemirror/next/syntax"
import {Extension} from "@codemirror/next/state"
import {styleTags} from "@codemirror/next/highlight"

/// A syntax provider based on the [Lezer Python
/// parser](https://github.com/lezer-parser/python), extended with
/// highlighting and indentation information.
export const pythonSyntax = LezerSyntax.define(parser.withProps(
  indentNodeProp.add({
    Body: continuedIndent()
  }),
  foldNodeProp.add({
    Body(tree) { return {from: tree.from + 1, to: tree.to - 1} },
    ArrayExpression(tree) { return {from: tree.from + 1, to: tree.to - 1} },
    DictionaryExpression(tree) { return {from: tree.from + 1, to: tree.to - 1} }
  }),
  styleTags({
    "async * ** FormatConversion": "modifier",
    "for while if elif else try except finally return raise break continue with pass assert await yield": "keyword control",
    "in not and or is del": "operatorKeyword",
    "import from def class global nonlocal lambda": "keyword definition",
    "with as print": "keyword",
    self: "self",
    Boolean: "bool",
    None: "null",
    VariableName: "variableName",
    PropertyName: "propertyName",
    Comment: "lineComment",
    Number: "number",
    String: "string",
    FormatString: "string#2",
    UpdateOp: "updateOperator",
    ArithOp: "arithmeticOperator",
    BitOp: "bitwiseOperator",
    CompareOp: "compareOperator",
    AssignOp: "operator definition",
    Ellipsis: "punctuation",
    At: "punctuation meta",
    "( )": "paren",
    "[ ]": "squareBracket",
    "{ }": "brace",
    ".": "derefOperator",
    ", ;": "separator"
  })
), {
  languageData: {
    closeBrackets: {brackets: ["(", "[", "{", "'", '"', "'''", '"""']},
    commentTokens: {line: "#"},
    indentOnInput: /^\s*[\}\]\)]$/
  }
})

/// Returns an extension that installs the Python syntax provider.
export function python(): Extension {
  return pythonSyntax
}

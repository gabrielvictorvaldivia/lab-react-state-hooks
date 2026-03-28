/** @type {import("prettier").Config} */
const config = {
    semi: true,               // Força ponto e vírgula
    singleQuote: true,        // Usa aspas simples
    trailingComma: "all",     // Vírgula no último item de arrays/objetos
    printWidth: 80,           // Quebra linha após 80 caracteres
    tabWidth: 2,              // Identação de 2 espaços
    endOfLine: "auto",
};

export default config;
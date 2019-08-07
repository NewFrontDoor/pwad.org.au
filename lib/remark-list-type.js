module.exports = listType;

function listType() {
  const {Parser} = this;
  const tokenizers = Parser.prototype.blockTokenizers;
  const methods = Parser.prototype.blockMethods;

  tokenizers.list = tokenizeListType;

  // Run it just before `text`.
  methods.splice(methods.indexOf('list'), 0, 'list-type');
}

function tokenizeListType(eat, value, silent) {
  const matchUppercase = /^([A-Z]+)\./.exec(value);
  const matchLowercase = /^([A-Z]+)\./i.exec(value);
  const matchUppercaseNumeral = /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))\./.exec(
    value
  );
  const matchLowercaseNumeral = /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))\./i.exec(
    value
  );

  const match =
    matchUppercase ||
    matchLowercase ||
    matchUppercaseNumeral ||
    matchLowercaseNumeral;

  if (match) {
    if (silent) {
      return true;
    }

    let type;

    if (matchUppercase) {
      type = 'A';
    }

    if (matchLowercase) {
      type = 'a';
    }

    if (matchUppercaseNumeral) {
      type = 'I';
    }

    if (matchLowercaseNumeral) {
      type = 'i';
    }

    return eat(match[0])({
      type: 'list',
      properties: {
        type
      },
      children: [{type: 'text', value: match[0]}]
    });
  }
}

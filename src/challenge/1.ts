/**
 * In this first exercise we will test our understanding of basic types
 * and their syntax by adding typing to an untyped source.
 */

/**
 * ASSIGNMENT
 * Edit the following program removing every use of the type any and
 * adding types where appropriate.
 */

function oddOrEven(n: any): any {
  return n % 2 === 1 ? 'odd' : 'even'
}

function splitOddFromEven(length: any): any {
  const result: any = { odd: [], even: [] }
  for (let i = 0; i < length; i++) {
    result[oddOrEven(i)].push(i)
  }
  return result
}

const result = splitOddFromEven(20)
console.log(result)

export {}

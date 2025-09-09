/**
 * In this exercise we’ll work on narrowing, trying to apply different
 * techniques in a practical example.
 */

/**
 * ASSIGNMENT
 * Implement the narrowing logic inside the splitIntoGroups function
 */

/**
 * Useful resources:
 *  - https://www.typescriptlang.org/docs/handbook/2/narrowing.html
 */

type User = {
  name: string
  age: number
  occupation: string
}

type Admin = {
  name: string
  role: string
}

type SplitResult = { numbers: number[]; dates: Date[]; users: User[]; admins: Admin[] }

function splitIntoGroups(values: (number | Date | User | Admin)[]): SplitResult {
  const result: SplitResult = { admins: [], dates: [], numbers: [], users: [] }
  for (const value of values) {
    //TODO: implement the narrowing logic by replacing the true with the correct condition
    //HINT: available narrowing techniques: typeof, instanceof, in
    if (true) {
      result.numbers.push(value)
    } else if (true) {
      result.dates.push(value)
    } else if (true) {
      result.users.push(value)
    } else {
      result.admins.push(value)
    }
  }
  return result
}

const result = splitIntoGroups([
  1,
  new Date(),
  { name: 'me', age: 24, occupation: 'none' },
  { name: 'you', role: 'admin' },
  new Date(2024, 1, 1),
  2,
])
console.log(result)

export {}

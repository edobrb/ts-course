/**
 * In this exercise we’ll work on narrowing, trying to apply different
 * techniques in a practical example.
 */

/**
 * ASSIGNEMENT
 * Implement the narrowing logic inside the splitIntoGroups function
 */

/**
 * Usefull resources:
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
    if (typeof value === 'number') {
      result.numbers.push(value) // Hover the mouse over the value, you can see it's narrowed to number
    } else if (value instanceof Date) {
      result.dates.push(value) // Same for Date
    } else if ('occupation' in value) {
      // What if a 'occupation' field is added to the Admin type?
      result.users.push(value) // Same for User
    } else {
      result.admins.push(value) // Same for Admin
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

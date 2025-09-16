// ASSIGNMENT: Build a fully typed groupBy function
// Create a type system for a groupBy function that can group by different types.
//
// Requirements:
// 1. Complete GetAllowedKeys type
// 2. Complete GroupByResult type
// 3. Complete groupBy function
//
// Start with this code:

//Allowed keys for grouping
type AllowedKeys = string | number | symbol

//Adds constraints to the generic parameters
//Implement this time in order to return only the keys of the object that the corresponding field is of type AllowedKeys
type GetAllowedKeys<T> = unknown

//Adds constraints to the generic parameters
//Implement this time in order to return a record where the keys are of the type that we are grouping on, the values should be an array of the items
type GroupByResult<T, K> = unknown

//Adds constraints to the generic parameters
function groupBy<T, K>(array: T[], field: K): GroupByResult<T, K> {
  return array.reduce(
    (acc, item) => {
      const key = item[field]
      if (key !== null && key !== undefined) {
        const keyAsAllowed = key as Extract<T[K], AllowedKeys>
        const group = (acc[keyAsAllowed] ?? []) as T[]
        group.push(item)
        acc[keyAsAllowed] = group
      }
      return acc
    },
    {} as GroupByResult<T, K>,
  )
}

// Example usage

type User = {
  name: string
  surname?: string
  type: 'user' | 'admin'
  age: number
  metadata: Record<string, unknown>
}

const users: User[] = [
  { name: 'John', type: 'user', age: 20, metadata: {} },
  { name: 'Jane', type: 'user', age: 21, metadata: {} },
  { name: 'Jane', type: 'admin', age: 23, metadata: {} },
]

//result should be typed as { user?: User[], admin?: User[] }
//the second argument should be only allow keys 'name', 'type', 'age'
const result = groupBy(users, 'type')
console.log(result)

export {}

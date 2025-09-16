// ASSIGNMENT: Create a coherent type system for Either

type Either<S, F> = Success<S> | Failure<F>

// How can we structurally distinguish a Success from a Failure?
// This type should represent a successful outcome.
type Success<T> = unknown

// This type should represent a failed outcome.
type Failure<T> = unknown

// This function should wrap a value in a Success type.
function success<S>(value: S): Either<S, never> {
  throw new Error('Not implemented')
}

// This function should wrap an error in a Failure type.
function failure<F>(error: F): Either<never, F> {
  throw new Error('Not implemented')
}

// How can we check if an 'Either' is a 'Success'? This function should act as a type guard.
function isSuccess<S, F>(value: Either<S, F>): value is Success<S> {
  throw new Error('Not implemented')
}

// If the 'Either' is a 'Success', apply the function to its value, otherwise, pass the 'Failure' through.
function map<S, F, T>(either: Either<S, F>, fn: (value: S) => T): Either<T, F> {
  throw new Error('Not implemented')
}

//Example usage

type User = {
  id: string
  name: string
}

function fetchUser(id: string): Either<User, string> {
  if (Math.random() > 0.5) {
    return failure('User not found')
  }
  return success({ id, name: 'John' })
}

const user = fetchUser('1')
const userName = map(user, (user) => user.name)

if (isSuccess(userName)) {
  console.log(userName.value)
} else {
  console.log(userName.error)
}

export {}

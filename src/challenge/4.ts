// ASSIGNMENT: Create a coherent type system for Either

type Either<S, F> = Success<S> | Failure<F>

type Success<T> = unknown

type Failure<T> = unknown

function success<S>(value: S): Either<S, never> {
  throw new Error('Not implemented')
}

function failure<F>(error: F): Either<never, F> {
  throw new Error('Not implemented')
}

function isSuccess<S, F>(value: Either<S, F>): value is Success<S> {
  throw new Error('Not implemented')
}

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

// ASSIGNMENT: Create a coherent type system for Either

type Either<S, F> = Success<S> | Failure<F>

type Success<T> = {
  success: true
  value: T
}

type Failure<T> = {
  success: false
  error: T
}

function success<S>(value: S): Either<S, never> {
  return { success: true, value }
}

function failure<F>(error: F): Either<never, F> {
  return { success: false, error }
}

function isSuccess<S, F>(value: Either<S, F>): value is Success<S> {
  return value.success
}

function map<S, F, T>(either: Either<S, F>, fn: (value: S) => T): Either<T, F> {
  return either.success ? { success: true, value: fn(either.value) } : { success: false, error: either.error }
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

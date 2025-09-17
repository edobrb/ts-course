// ASSIGNMENT: Building a Schema Validator
//
// Requirements:
// 1. Add support for boolean fields
// 2. Implement validation logic
// 3. Try it with a boolean field
//
// Start with this code:

type TextField = { type: 'text'; minLength?: number; maxLength?: number }
type NumberField = { type: 'number'; min?: number; max?: number }
type BooleanField = { type: 'boolean' }

type BaseFieldOptions = {
  required: boolean
  label: string
}

type Field = BaseFieldOptions & (TextField | NumberField | BooleanField)

type Schema = Record<string, Field>

type SchemaType<T extends Schema> = {
  [K in keyof T]: FieldType<T[K]> | (T[K]['required'] extends true ? never : undefined)
}

type FieldType<T extends Field> = T extends TextField
  ? string
  : T extends NumberField
    ? number
    : T extends BooleanField
      ? boolean
      : never

type ValidationResult<T extends Schema> =
  | {
      success: true
      value: SchemaType<T>
    }
  | {
      success: false
      errors: string[]
    }

function validateValue<const T extends Schema>(SchemaFields: T, value: Record<string, unknown>): ValidationResult<T> {
  const errors: string[] = []
  const resultValue: Record<string, unknown> = {}

  for (const [key, field] of Object.entries(SchemaFields)) {
    const v = value[key]
    const type = typeof v
    if (field.required && v === undefined) {
      errors.push(`${key} (${field.label}) is required`)
    }
    if (!field.required && v === undefined) {
      continue
    }
    if (field.type === 'number') {
      if (typeof v === 'number') {
        if (field.min && v < field.min) {
          errors.push(`${key} (${field.label}) must be greater than ${field.min}, got ${v}`)
        }
        if (field.max && v > field.max) {
          errors.push(`${key} (${field.label}) must be less than ${field.max}, got ${v}`)
        }
      } else {
        errors.push(`${key} (${field.label}) must be a number, got ${typeof v} (${v})`)
      }
    }

    if (field.type === 'text') {
      if (typeof v === 'string') {
        if (field.minLength && v.length < field.minLength) {
          errors.push(`${key} (${field.label}) must be at least ${field.minLength} characters long, got ${v.length}`)
        }
        if (field.maxLength && v.length > field.maxLength) {
          errors.push(`${key} (${field.label}) must be at most ${field.maxLength} characters long, got ${v.length}`)
        }
      } else {
        errors.push(`${key} (${field.label}) must be a text, got ${typeof v} (${v})`)
      }
    }

    if (field.type === 'boolean' && typeof v !== 'boolean') {
      errors.push(`${key} (${field.label}) must be of type boolean, got ${typeof v} (${v})`)
    }
    resultValue[key] = v
  }
  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }
  return { success: true, value: resultValue as SchemaType<T> }
}

// Example usage
const inputData: Record<string, unknown> = {
  username: 'John',
  age: 20,
  allowDataUsage: true,
}

const schema = {
  username: { type: 'text', required: true, label: 'Username', minLength: 3, maxLength: 20 },
  age: { type: 'number', required: false, label: 'Age', min: 1, max: 100 },
  allowDataUsage: { type: 'boolean', required: true, label: 'Allow Data Usage' },
} as const satisfies Schema

const result = validateValue(schema, inputData)

if (result.success) {
  console.log(result.value)
} else {
  console.log(result.errors)
}

export {}

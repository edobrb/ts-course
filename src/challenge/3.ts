// ASSIGNMENT: Building a Form Field Validator
//
// Requirements:
// 1. Add support for boolean fields
// 2. Implement validation logic
// 3. Try it with a boolean field
//
// Start with this code:

type TextField = { type: 'text'; minLength?: number; maxLength?: number }
type NumberField = { type: 'number'; min?: number; max?: number }

type BaseFieldOptions = {
  required: boolean
  label: string
}

type Field = BaseFieldOptions & (TextField | NumberField)

type Form = Record<string, Field>

type FormType<F extends Form> = {
  [K in keyof F]: FieldType<F[K]> | (F[K]['required'] extends true ? never : undefined)
}

type FieldType<F extends Field> = F extends TextField ? string : F extends NumberField ? number : never

type ValidationResult<F extends Form> =
  | {
      success: true
      value: FormType<F>
    }
  | {
      success: false
      errors: string[]
    }

function validateForm<const F extends Form>(formFields: F, value: Record<string, unknown>): ValidationResult<F> {
  const errors: string[] = []
  const resultValue: Record<string, unknown> = {}

  for (const [key, field] of Object.entries(formFields)) {
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

    //TODO: boolean validation

    resultValue[key] = v
  }
  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }
  return { success: true, value: resultValue as FormType<F> }
}

// Example usage
const inputData: Record<string, unknown> = {
  username: 'John',
  age: 20,
  //allowDataUsage: true,
}

const result = validateForm(
  {
    username: { type: 'text', required: true, label: 'Username', minLength: 3, maxLength: 20 },
    age: { type: 'number', required: false, label: 'Age', min: 1, max: 100 },
    //allowDataUsage: { type: 'boolean', required: true, label: 'Allow Data Usage' },
  },
  inputData,
)

if (result.success) {
  console.log(result.value)
} else {
  console.log(result.errors)
}

export {}

// ASSIGNMENT: Building a Form Field Type Generator
// Create a type system for a form library that can generate field validation types based on
// field configurations. The system should support different field types (text, number, email)
// and their corresponding validation rules.
//
// Requirements:
// 1. Create a conditional type that validates field types
// 2. Use mapped types to transform field configurations into validation rules
// 3. Implement template literal types for error messages
//
// Start with this code:

// Field types
type FieldType = 'text' | 'number' | 'email'

// Basic field configuration
type BaseField = {
  type: FieldType
  required: boolean
  label: string
}

// TODO: Create a type ValidatorFor<T extends FieldType> that returns appropriate
// validator type based on the field type by replacing the never with the correct type
type ValidatorFor<T extends FieldType> = T extends 'text'
  ? { minLength: number; maxLength: number }
  : T extends 'number'
    ? { min: number; max: number }
    : T extends 'email'
      ? { emailPattern: RegExp }
      : never

// TODO: Create type FormFields<T> that transforms a record of field configurations
// into a record of their validation rules by replacing the never with the correct type
type FormFields<T extends Record<string, BaseField>> = {
  [K in keyof T]: {
    validator: ValidatorFor<T[K]['type']>
    isRequired: T[K]['required']
    fieldLabel: T[K]['label']
  }
}

// Test your implementation with this configuration:
type LoginForm = {
  username: BaseField
  age: BaseField
  email: BaseField
}

const loginConfig = {
  username: { type: 'text', required: true, label: 'Username' },
  age: { type: 'number', required: true, label: 'Age' },
  email: { type: 'email', required: true, label: 'Email' },
} as const satisfies LoginForm

// Your types should make this code type-check correctly:
type LoginFormFields = FormFields<LoginForm>

// This should now type-check correctly:
const loginFormValidation: LoginFormFields = {
  username: {
    validator: { minLength: 3, maxLength: 20 },
    isRequired: true,
    fieldLabel: 'Username',
  },
  age: {
    validator: { min: 18, max: 100 },
    isRequired: true,
    fieldLabel: 'Age',
  },
  email: {
    validator: { emailPattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/ },
    isRequired: true,
    fieldLabel: 'Email',
  },
}
console.log(loginFormValidation)

export {}
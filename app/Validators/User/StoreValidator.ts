import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string({ trim: true }),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
        caseInsensitive: true
      })
    ]),
    password: schema.string({ trim: true }, [
      //rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60}$/),
      rules.minLength(6),
      rules.maxLength(60),
      rules.confirmed()
    ]),
    role: schema.enum.optional(
      ['user', 'support', 'admin'] as const
    ),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'name.required': 'Name is required',
    'email.required': 'Email is required',
    'email.unique': 'User with email address already exists',
    'password.minLength': 'Password must contain at least 6 characters',
    'password.maxLength': 'Password must contain up to 60 characters',
    'password_confirmation.confirmed': 'The password confirmation does not match',
    'role.enum': 'Role invalid'
  }
}

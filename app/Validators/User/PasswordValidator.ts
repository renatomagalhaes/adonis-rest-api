import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class PasswordValidator {
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
    old_password: schema.string({ trim: true }),
    password: schema.string({ trim: true }, [
      //rules.regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,60}$/),
      rules.minLength(6),
      rules.maxLength(60),
      rules.confirmed()
    ])
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
    'old_password.required': 'Current password is required',
    'password.minLength': 'Password must contain at least 6 characters',
    'password.maxLength': 'Password must contain up to 60 characters',
    'password_confirmation.confirmed': 'The password confirmation does not match'
  }
}

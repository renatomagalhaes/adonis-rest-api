import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

//import User from 'App/Models/User'

import { ProfileValidator, PasswordValidator } from 'App/Validators/User'

export default class UserController {
  public async profile({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }

  public async updateProfile({ request, auth }: HttpContextContract) {
    const data = await request.validate(ProfileValidator)
    const user = await auth.authenticate()

    user.merge(data)
    await user.save()

    return user
  }

  public async changePassword({ auth, request, response }: HttpContextContract) {
    const { old_password, password } = await request.validate(PasswordValidator)

    const user = await auth.authenticate()

    // Verify password
    if (!(await Hash.verify(user.password, old_password))) {
      return response.badRequest({ error: { message: 'Invalid credentials' } })
    }

    user.password = password;
    await user.save()

    // Revoke tokens
    await auth.use('api').revoke()

    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '30 days'
    })

    return token
  }

  public async index({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}

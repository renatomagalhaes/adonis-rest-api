import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'

import User from 'App/Models/User'

import {
  ProfileValidator,
  PasswordValidator,
  StoreValidator,
  UpdateValidator
} from 'App/Validators/User'

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

    user.password = password
    await user.save()

    // Revoke tokens
    await auth.use('api').revoke()

    // Generate token
    const token = await auth.use('api').generate(user, {
      expiresIn: '30 days'
    })

    return token
  }

  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const users = await User.query().orderBy('id').paginate(page, limit)

    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(StoreValidator)
    const user = await User.create(data)

    return user
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      return user

    } catch (err) {
      return response.badRequest({ error: "User not found or invalid" })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const data = await request.validate(UpdateValidator)
    
    try {
      const user = await User.findOrFail(params.id)
      user.merge(data)
      await user.save()

      return user
      
    } catch (err) {
      return response.badRequest({ error: "User not found or invalid" })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      
    } catch (err) {
      return response.badRequest({ error: "User not found or invalid" })
    }
  }
}

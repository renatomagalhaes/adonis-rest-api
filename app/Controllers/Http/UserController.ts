import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

//import User from 'App/Models/User'

import { ProfileValidator } from 'App/Validators/User';

export default class UserController {

  public async profile ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }

  public async updateProfile ({ request, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const data = await request.validate(ProfileValidator)

    user.merge(data)
    await user.save()
    
    return user
  }

  public async changePassword ({ auth }: HttpContextContract) {
    const user = await auth.authenticate()

    return user
  }

  public async index ({}: HttpContextContract) {
  }

  public async store ({}: HttpContextContract) {
  }

  public async show ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

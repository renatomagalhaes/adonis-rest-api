import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class CreateUserSeeder extends BaseSeeder {
  public static developmentOnly = true

  public async run () {
    await User.createMany([
      {
        name: "Admin Name",
        email: 'admin@example.com',
        password: 'secret',
        role: 'admin'
      },
      {
        name: "Support Name",
        email: 'support@example.com',
        password: 'secret',
        role: 'support'
      },
      {
        name: "User Name",
        email: 'user@example.com',
        password: 'secret',
        role: 'user'
      }
    ])
  }
}

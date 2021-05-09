import Route from '@ioc:Adonis/Core/Route'

Route.get('/profile', 'UserController.profile').middleware('auth')
Route.post('/update-profile', 'UserController.updateProfile').middleware('auth')
Route.post('/change-password', 'UserController.changePassword').middleware('auth')

Route.resource('/users', 'UserController')
  .apiOnly()
  .middleware({
    index: ['acl:admin,support'],
    show: ['acl:admin,support'],
    store: ['acl:admin'],
    update: ['acl:admin'],
    destroy: ['acl:admin']
  })
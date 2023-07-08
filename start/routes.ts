import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
	Route.post('register', 'AuthController.register');
	Route.post('login', 'AuthController.login');

	Route.group(() => {
		Route.get('/', 'BlogController.list');
		Route.get('/:id', 'BlogController.get');
		Route.post('/new', 'BlogController.store');
		Route.patch('/update', 'BlogController.edit');
		Route.delete('/:id', 'BlogController.delete');
	})
		.prefix('blogs')
		.middleware('auth:api');
}).prefix('api');

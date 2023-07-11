import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
	// ======================== AUTH ======================== //
	Route.post('register', 'AuthController.register');
	Route.post('login', 'AuthController.login');
	// ======================== BLOGS ======================= //
	Route.group(() => {
		Route.get('/', 'BlogController.list');
		Route.get('/:id', 'BlogController.get');
		Route.group(() => {
			Route.post('/new', 'BlogController.store');
			Route.patch('/:id', 'BlogController.edit');
			Route.delete('/:id', 'BlogController.delete');
		}).middleware('auth:api');
	}).prefix('blogs');
	// ======================== POSTS ======================= //
	Route.group(() => {
		Route.get('/', 'PostController.list');
		Route.get('/:id', 'PostController.get');
		Route.group(() => {
			Route.post('/new', 'PostController.store');
			Route.patch('/:id', 'PostController.edit');
			Route.delete('/:id', 'PostController.delete');
		}).middleware('auth:api');
	}).prefix('posts');
}).prefix('api');

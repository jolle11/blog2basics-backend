import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
	// ======================== AUTH ======================== //
	Route.post('user', 'AuthController.get');
	Route.post('register', 'AuthController.register');
	Route.post('login', 'AuthController.login');
	// ======================== BLOGS ======================= //
	Route.group(() => {
		// ======================= PRIVATE ====================== //
		Route.group(() => {
			Route.post('/new', 'BlogController.store');
			Route.patch('/:blogId', 'BlogController.edit');
			Route.delete('/:blogId', 'BlogController.delete');
			// ======================== POSTS ======================= //
			Route.group(() => {
				// Route.get('/', 'PostController.list');
				// Route.get('/:postId', 'PostController.get');
				Route.group(() => {
					Route.post('/new', 'PostController.store');
					Route.patch('/:postId', 'PostController.edit');
					Route.delete('/:postId', 'PostController.delete');
					// ====================== COMMENTS ====================== //
					Route.group(() => {
						Route.get('/', 'CommentController.list');
						Route.get('/:commentId', 'CommentController.get');
						Route.group(() => {
							Route.post('/new', 'CommentController.store');
							Route.patch('/:commentId', 'CommentController.edit');
							Route.delete('/:commentId', 'CommentController.delete');
						}); // .middleware('auth:api');
					}).prefix(':postId/comments');
				});
			}).prefix(':blogId/posts');
		}).middleware('auth:api');
		// ======================= PUBLIC ======================= //
		Route.get('/', 'BlogController.list');
		Route.get('/posts', 'PostController.list');
		Route.get('/:blogId', 'BlogController.get');
		Route.get('/:blogId/posts/:postId', 'PostController.get');
	}).prefix('blogs');
}).prefix('api');

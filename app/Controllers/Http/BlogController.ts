import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Blog from 'App/Models/Blog';

export default class BlogController {
	public async list() {
		const blogs = await Blog.all();

		return blogs.reverse();
	}

	public async get({ params }: HttpContextContract) {
		try {
			const userBlog = await Blog.findBy('id', params.id);
			return userBlog;
		} catch (error) {
			return error;
		}
	}

	public async store({ request, auth }: HttpContextContract) {
		try {
			const data = request.all();

			if (auth.isLoggedIn) {
				const user = await auth.authenticate();
				const blog = new Blog();

				blog.name = data.name;
				blog.description = data.description;

				await user.related('blog').save(blog);

				return blog;
			}
		} catch (error) {
			return error;
		}
	}
}

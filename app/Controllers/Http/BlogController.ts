import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Blog from 'App/Models/Blog';
import User from 'App/Models/User';

export default class BlogController {
	public async list() {
		const blogs = await Blog.all();

		return blogs.reverse();
	}

	public async get({ params, auth }: HttpContextContract) {
		if (auth.isLoggedIn) {
			const userBlog = await Blog.query()
				.where('id', params.id)
				.where('created_by', auth.user.id);
			return userBlog;
		}
	}
}

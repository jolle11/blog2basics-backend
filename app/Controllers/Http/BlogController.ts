import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Blog from 'App/Models/Blog';

export default class BlogController {
	public async list() {
		const blogs = await Blog.all();
		return blogs.reverse();
	}

	public async get({ params }: HttpContextContract) {
		const blog = await Blog.findByOrFail('id', params.id);
		return blog;
	}

	public async store({ request, response, auth }: HttpContextContract) {
		const user = await auth.authenticate();
		const data = request.all();
		const userHasBlog = Blog.findBy('user_id', auth.user?.id);

		if (Object.keys(userHasBlog).length === 0 && user) {
			const blog = new Blog();

			blog.name = data.name;
			blog.description = data.description;

			await user.related('blog').save(blog);

			return blog;
		} else {
			return response
				.status(403)
				.send({ status: '403 Forbidden', message: 'Only one blog per user' });
		}
	}

	// public async edit({ params, request, response, auth }: HttpContextContract) {}

	public async delete({ params, auth, response }: HttpContextContract) {
		const user = await auth.authenticate();
		const blog = await Blog.findBy('id', params.id);

		if (user && blog) {
			await blog.delete();

			return response
				.status(200)
				.send({ status: '200 OK', message: 'Blog deleted' });
		}
	}
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Blog from 'App/Models/Blog';

export default class BlogController {
	public async list() {
		const blogs = await Blog.all();
		return blogs.reverse();
	}

	public async get({ params, response }: HttpContextContract) {
		const blog = await Blog.findByOrFail('id', params.id);
		return response.ok(blog);
	}

	public async store({ request, response, auth }: HttpContextContract) {
		const user = await auth.authenticate();
		const data = request.all();
		const userHasBlog = Blog.findBy('user_id', auth.user?.id);

		if (Object.keys(userHasBlog).length === 0 && user) {
			const blog = new Blog();

			blog.merge({ name: data.name, description: data.description });

			await user.related('blog').save(blog);

			return response.created({ message: 'Blog created successfully' });
		} else {
			return response.nonAuthoritativeInformation({
				message: 'Only one blog per user',
			});
		}
	}

	public async edit({ params, request, response, auth }: HttpContextContract) {
		const user = await auth.authenticate();
		const data = request.all();
		const blog = Blog.findByOrFail('id', params.id);

		if (blog && user.id === (await blog).userId) {
			(await blog)
				.merge({ name: data.name, description: data.description })
				.save();
			return response.ok({ message: 'Blog updated successfully' });
		} else {
			return response.unauthorized({
				message: "You're not authorized to edit this blog",
			});
		}
	}

	public async delete({ params, auth, response }: HttpContextContract) {
		const user = await auth.authenticate();
		const blog = Blog.findByOrFail('id', params.id);

		if (blog && user.id === (await blog).userId) {
			(await blog).delete();

			return response.ok({ message: 'Blog deleted successfully' });
		}
	}
}

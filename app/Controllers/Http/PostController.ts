import Blog from 'App/Models/Blog';
import Post from 'App/Models/Post';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class PostController {
	public async list({ params }) {
		if (params.blogId) {
			return await Database.from('posts')
				.where('blog_id', params.blogId)
				.paginate(1, 10);
		}
		return await Database.from('posts').paginate(1, 10);
	}

	public async get({ params, response }: HttpContextContract) {
		const post = await Post.findByOrFail('id', params.id);
		return response.ok(post);
	}

	public async store({ request, response, auth }: HttpContextContract) {
		const user = await auth.authenticate();
		const data = request.all();

		if (data) {
			const post = new Post();
			//
			return response.ok({ message: 'Post created successfully' });
		} else {
		}
	}

	public async edit({ params, request, response, auth }: HttpContextContract) {
		const user = await auth.authenticate();
		const data = request.all();
		const post = await Post.findByOrFail('id', params.id);
		const blog = await Blog.findByOrFail('id', post.blogId);

		if (post && user.id === post.blogId) {
			blog.merge({ name: data.name, description: data.description }).save();
			return response.ok({ message: 'Post updated successfully' });
		} else {
			return response.unauthorized({
				message: "You're not authorized to edit this post",
			});
		}
	}

	public async delete({ params, auth, response }: HttpContextContract) {
		const user = await auth.authenticate();
		const post = await Post.findByOrFail('id', params.id);

		if (post && user.id === post.blogId) {
			post.delete();

			return response.ok({ message: 'Post deleted successfully' });
		} else {
			return response.unauthorized({
				message: 'You are not allowed to delete this post',
			});
		}
	}
}

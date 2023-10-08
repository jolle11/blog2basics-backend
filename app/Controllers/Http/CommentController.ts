import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class CommentController {
	public async list({ params, response }: HttpContextContract) {
		const comments = await Database.from('comments')
			.join('users', 'comments.user_id', 'users.id')
			.where('comments.post_id', '=', params.postId)
			.select('comments.*', 'users.alias');

		return comments;
	}
	public async get({ params, response }: HttpContextContract) {
		return params;
	}
	public async store() {}
	public async edit() {}
	public async delete() {}
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class CommentController {
	public async list({ params, response }: HttpContextContract) {
		const comments = await Database.from('comments').where(
			'post_id',
			'=',
			params.postId,
		);
		return comments;
	}
	public async get({ params, response }: HttpContextContract) {
		return params;
	}
	public async store() {}
	public async edit() {}
	public async delete() {}
}

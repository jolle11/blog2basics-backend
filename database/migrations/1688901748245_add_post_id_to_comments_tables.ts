import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'comments';

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table
				.integer('post_id')
				.unsigned()
				.references('posts.id')
				.onDelete('CASCADE'); // delete post when user is deleted
		});
	}

	public async down() {
		this.schema.alterTable(this.tableName, (table) => {});
	}
}

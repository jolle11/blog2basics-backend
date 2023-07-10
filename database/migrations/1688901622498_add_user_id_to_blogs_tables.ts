import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'blogs';

	public async up() {
		this.schema.alterTable(this.tableName, (table) => {
			table
				.integer('user_id')
				.unsigned()
				.unique()
				.references('users.id')
				.onDelete('CASCADE');
		});
	}

	public async down() {
		this.schema.alterTable(this.tableName, (table) => {});
	}
}

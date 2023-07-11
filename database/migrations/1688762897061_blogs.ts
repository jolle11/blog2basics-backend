import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'blogs';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');

			table.string('name').notNullable().unique();
			table.text('description').nullable();

			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
			table.timestamp('deleted_at', { useTz: true }).nullable();
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}

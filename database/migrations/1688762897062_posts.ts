import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
	protected tableName = 'posts';

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');

			table.string('title');
			table.string('body');

			table.timestamp('created_at', { useTz: true });
			table.timestamp('updated_at', { useTz: true });
			table.timestamp('deleted_at', { useTz: true }).nullable();
		});
	}

	public async down() {
		this.schema.dropTable(this.tableName);
	}
}

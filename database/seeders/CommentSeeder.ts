import CommentFactory from 'Database/factories/CommentFactory';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class extends BaseSeeder {
	public async run() {
		await CommentFactory.createMany(40);
	}
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import PostFactory from 'Database/factories/PostFactory';

export default class extends BaseSeeder {
	public async run() {
		await PostFactory.createMany(30);
	}
}

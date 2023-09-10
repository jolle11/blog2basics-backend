import PostFactory from 'Database/factories/PostFactory';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class extends BaseSeeder {
	public async run() {
		await PostFactory.createMany(30);
	}
}

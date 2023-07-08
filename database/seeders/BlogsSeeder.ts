import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import BlogFactory from 'Database/factories/BlogFactory';

export default class extends BaseSeeder {
	public async run() {
		await BlogFactory.createMany(10);
	}
}

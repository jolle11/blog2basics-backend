import BlogFactory from 'Database/factories/BlogFactory';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

export default class extends BaseSeeder {
	public async run() {
		await BlogFactory.createMany(10);
	}
}

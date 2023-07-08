import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';
import UserFactory from 'Database/factories/UserFactory';

export default class extends BaseSeeder {
	public async run() {
		await User.create({
			name: 'Jordi',
			surname: 'Olle Balleste',
			alias: 'jordi0lle',
			email: 'jordi@olle.com',
			password: 'password',
		});
		await UserFactory.createMany(10);
	}
}

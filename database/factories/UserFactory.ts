import Factory from '@ioc:Adonis/Lucid/Factory';
import User from 'App/Models/User';

export default Factory.define(User, ({ faker }) => {
	return {
		name: faker.person.firstName(),
		surname: faker.person.lastName(),
		alias: faker.internet.displayName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
}).build();

import Factory from '@ioc:Adonis/Lucid/Factory';
import Blog from 'App/Models/Blog';

export default Factory.define(Blog, ({ faker }) => {
	return {
		name: faker.lorem.sentence(5),
		description: faker.lorem.paragraph(3),
	};
}).build();

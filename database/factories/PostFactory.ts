import Factory from '@ioc:Adonis/Lucid/Factory';
import Post from 'App/Models/Post';

export default Factory.define(Post, ({ faker }) => {
	return {
		title: faker.lorem.sentence(5),
		body: faker.lorem.paragraph(5),
		blog_id: Math.floor(Math.random() * (10 - 1 + 1) + 1),
	};
}).build();

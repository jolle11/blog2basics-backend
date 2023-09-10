import Comment from 'App/Models/Comment';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(Comment, ({ faker }) => {
	return {
		body: faker.lorem.paragraphs(2),
		user_id: Math.floor(Math.random() * (10 - 1 + 1) + 1),
		post_id: Math.floor(Math.random() * (10 - 1 + 1) + 1),
	};
}).build();

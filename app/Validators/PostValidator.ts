import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class PostValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		title: schema.string({}, [rules.minLength(8)]),
		body: schema.string({}, [rules.minLength(80)]),
	});

	public messages: CustomMessages = {
		'title.minLength': 'Title is too short. Minimum length is 8 characters',
		'title.required': 'Title is required',
		'description.minLength':
			'Description is too short. Minimum length is 2 characters',
		'description.required': 'Description is required',
	};
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class BlogValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		name: schema.string({}, [rules.minLength(2)]),
		description: schema.string({}, [rules.minLength(2)]),
	});

	public messages: CustomMessages = {
		'name.minLength': 'Name is too short. Minimum length is 2 characters',
		'name.required': 'Name is required',
		'description.minLength':
			'Description is too short. Minimum length is 2 characters',
	};
}

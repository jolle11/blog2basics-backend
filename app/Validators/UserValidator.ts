import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UserValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({
		email: schema.string({}, [rules.email()]),
		password: schema.string({}, [
			rules.minLength(8),
			rules.alphaNum({ allow: ['dash', 'underscore'] }),
		]),
		name: schema.string({}, [rules.minLength(2)]),
		surname: schema.string({}, [rules.minLength(2)]),
		alias: schema.string({}, [rules.minLength(2)]),
	});

	public messages: CustomMessages = {
		'name.minLength': 'Name is too short. Minimum length is 2 characters.',
		'password.minLength':
			'Password is too short. Minimum length is 8 characters.',
		'password.alphaNum':
			'Only dash and underscore characters are allowed apart from letters and numbers.',
	};
}

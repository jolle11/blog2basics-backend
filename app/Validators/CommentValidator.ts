import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';

export default class CommentValidator {
	constructor(protected ctx: HttpContextContract) {}

	public schema = schema.create({});

	public messages: CustomMessages = {};
}

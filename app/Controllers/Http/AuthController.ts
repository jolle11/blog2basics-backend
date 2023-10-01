import Blog from 'App/Models/Blog';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
export default class AuthController {
	public async get({ request }) {
		const user = await User.findBy('remember_me_token', request.body().token);
		const blog = await Blog.findBy('user_id', user?.id);

		return { user, blog };
	}

	public async login({ request, response, auth }: HttpContextContract) {
		const email = request.input('email');
		const password = request.input('password');

		const token = await auth.use('api').attempt(email, password, {
			expiresIn: '10 days',
		});
		if (token) {
			const user = await User.findBy('email', email);
			user.rememberMeToken = token.token;
			await user.save();
			const blog = await Blog.findBy('user_id', user?.id);
			return {
				token: token.token,
				email: email,
				alias: user?.alias,
				blog,
			};
		} else {
			return response.badRequest();
		}
	}

	public async register({ request, auth }: HttpContextContract) {
		const validatedUser = await request.validate(UserValidator);

		const email = validatedUser.email;
		const password = validatedUser.password;
		const name = validatedUser.name;
		const surname = validatedUser.surname;
		const alias = validatedUser.alias;

		const user = new User();

		user.email = email;
		user.password = password;
		user.name = name;
		user.surname = surname;
		user.alias = alias;

		await user.save();

		const token = await auth.use('api').login(user, {
			expiresIn: '10 days',
		});

		return token.toJSON();
	}
}

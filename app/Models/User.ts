import Blog from './Blog';
import Hash from '@ioc:Adonis/Core/Hash';
import {
	BaseModel,
	HasOne,
	beforeSave,
	column,
	hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;
	@column()
	public surname: string;
	@column()
	public alias: string;

	@column()
	public email: string;
	@column({ serializeAs: null })
	public password: string;
	@column()
	public rememberMeToken: string | null;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'customDeletedAtColumn' })
	public deletedAt?: DateTime | null;

	@hasOne(() => Blog)
	public blog: HasOne<typeof Blog>;

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}

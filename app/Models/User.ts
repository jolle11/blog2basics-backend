import { DateTime } from 'luxon';
import Blog from './Blog';
import Comment from './Comment';
import Post from './Post';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import Hash from '@ioc:Adonis/Core/Hash';
import { compose } from '@ioc:Adonis/Core/Helpers';
import {
	BaseModel,
	HasMany,
	HasOne,
	beforeSave,
	column,
	hasMany,
	hasOne,
} from '@ioc:Adonis/Lucid/Orm';

export default class User extends compose(BaseModel, SoftDeletes) {
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
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt: DateTime | null;

	@hasOne(() => Blog)
	public blog: HasOne<typeof Blog>;
	@hasMany(() => Post)
	public post: HasMany<typeof Post>;
	@hasMany(() => Comment)
	public comment: HasMany<typeof Comment>;

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password);
		}
	}
}

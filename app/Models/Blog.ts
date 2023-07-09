import Post from './Post';
import User from './User';
import {
	BaseModel,
	BelongsTo,
	HasMany,
	belongsTo,
	column,
	hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Blog extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;
	@column()
	public description: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'customDeletedAtColumn' })
	public deletedAt?: DateTime | null;

	@hasMany(() => Post)
	public posts: HasMany<typeof Post>;

	@column()
	public userId: number;
	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;
}

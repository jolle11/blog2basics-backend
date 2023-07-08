import Comment from './Comment';
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

export default class Post extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'customDeletedAtColumn' })
	public deletedAt?: DateTime | null;

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>;

	@belongsTo(() => User)
	public createdBy: BelongsTo<typeof User>;
}

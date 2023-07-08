import User from './User';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

export default class Comment extends BaseModel {
	@column({ isPrimary: true })
	public id: number;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'customDeletedAtColumn' })
	public deletedAt?: DateTime | null;

	@belongsTo(() => User)
	public createdBy: BelongsTo<typeof User>;
}
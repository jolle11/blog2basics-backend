import { DateTime } from 'luxon';
import Post from './Post';
import User from './User';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import { compose } from '@ioc:Adonis/Core/Helpers';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

export default class Comment extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public body: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt: DateTime | null;

	@column()
	public userId: number;
	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;
	@column()
	public postId: number;
	@belongsTo(() => Post)
	public post: BelongsTo<typeof Post>;
}

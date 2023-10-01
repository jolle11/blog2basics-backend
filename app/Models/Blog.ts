import { DateTime } from 'luxon';
import Post from './Post';
import User from './User';
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify';
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes';
import { compose } from '@ioc:Adonis/Core/Helpers';
import {
	BaseModel,
	BelongsTo,
	HasMany,
	belongsTo,
	column,
	hasMany,
} from '@ioc:Adonis/Lucid/Orm';

export default class Blog extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public name: string;

	@column()
	@slugify({
		strategy: 'dbIncrement',
		fields: ['name'],
		allowUpdates: true,
	})
	public slug: string;

	@column()
	public description: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt: DateTime | null;

	@hasMany(() => Post)
	public posts: HasMany<typeof Post>;

	@column()
	public userId: number;
	@belongsTo(() => User)
	public user: BelongsTo<typeof User>;
}

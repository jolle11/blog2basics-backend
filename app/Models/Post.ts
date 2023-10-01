import { DateTime } from 'luxon';
import Blog from './Blog';
import Comment from './Comment';
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

export default class Post extends compose(BaseModel, SoftDeletes) {
	@column({ isPrimary: true })
	public id: number;

	@column()
	public title: string;

	@column()
	@slugify({
		strategy: 'dbIncrement',
		fields: ['title'],
		allowUpdates: true,
	})
	public slug: string;

	@column()
	public body: string;

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime;
	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime;
	@column.dateTime({ columnName: 'deleted_at' })
	public deletedAt: DateTime | null;

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>;

	@column()
	public blogId: number;
	@belongsTo(() => Blog)
	public blog: BelongsTo<typeof Blog>;
}

import { json, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createId } from '~/lib/cuid'

export const brands = pgTable('brands', {
  id: text('id')
    .$defaultFn(() => createId())
    .notNull()
    .unique()
    .primaryKey(),
  name: varchar('name', { length: 255 }),
  slug: varchar('slug', { length: 255 }).unique(),
  data: json('data'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

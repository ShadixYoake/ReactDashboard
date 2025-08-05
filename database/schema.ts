import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";


export const files = pgTable('files', {
  id: integer().primaryKey().generatedAlwaysAsIdentity().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  filePath: varchar('file_path', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity().unique(),
  name: varchar('name', { length: 50 }).notNull(),
  lastName: varchar('lastname', { length: 50 }).notNull(),
  secondLastName: varchar('second_lastname', { length: 50 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),
  password: varchar('password', { length: 72 }).notNull(), // bcrypt hash length
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  role: varchar('role', { length: 15 }).notNull().default('user'), // expanded for future roles
});

export const logs = pgTable('logs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  category: varchar('category', { length: 20 }).notNull(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const schema = {
  files,
  users,
  logs,
};  
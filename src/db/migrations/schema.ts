import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const workoutTable = sqliteTable('workout_table', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
});

export const exerciseTable = sqliteTable('exercise_table', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  sets: integer('sets').notNull(),
  reps: text('reps').notNull(),
  equipment: text('equipment').notNull(),
  durationInMinutes: integer('duration_in_minutes').notNull(),
  weight_range: text('weight_range'),
  exerciseGroup: text('exercise_group').notNull(),
  workoutId: integer('workout_id')
    .notNull()
    .references(() => workoutTable.id, { onDelete: 'cascade' }),
});

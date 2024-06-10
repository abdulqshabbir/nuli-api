import { Inject, Injectable } from '@nestjs/common';
import { Workout } from 'src/graphql';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../db/migrations/schema';
import { and, eq, not } from 'drizzle-orm';
import { mapWorkouts } from './workouts.helpers';

@Injectable()
export class WorkoutsService {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}
  async getAll(): Promise<Workout[]> {
    const workouts = await this.db
      .select({
        id: schema.workoutTable.id,
        exerciseId: schema.exerciseTable.id,
        exerciseName: schema.exerciseTable.name,
        exerciseSets: schema.exerciseTable.sets,
        exerciseReps: schema.exerciseTable.reps,
        exerciseEquipment: schema.exerciseTable.equipment,
        exerciseDurationInMinutes: schema.exerciseTable.durationInMinutes,
        exerciseWeightRange: schema.exerciseTable.weight_range,
        exerciseWorkoutId: schema.exerciseTable.workoutId,
        exerciseGroup: schema.exerciseTable.exerciseGroup,
      })
      .from(schema.workoutTable)
      .innerJoin(
        schema.exerciseTable,
        eq(schema.workoutTable.id, schema.exerciseTable.workoutId),
      )
      .where(not(eq(schema.exerciseTable.exerciseGroup, '')))
      .all();

    const mappedWorkouts = mapWorkouts(workouts);

    return mappedWorkouts;
  }

  async swapExercises(
    workoutId: number,
    exerciseId: number,
  ): Promise<Workout[]> {
    const availableExercisesWithoutGroup = await this.db
      .select({
        id: schema.exerciseTable.id,
        exerciseGroup: schema.exerciseTable.exerciseGroup,
      })
      .from(schema.exerciseTable)
      .where(
        and(
          eq(schema.exerciseTable.exerciseGroup, ''),
          eq(schema.exerciseTable.workoutId, workoutId),
        ),
      )
      .all();

    if (availableExercisesWithoutGroup.length < 1) {
      throw new Error('No exercises available to swap were found');
    }

    const newGroup = await this.db
      .select({
        exerciseGroup: schema.exerciseTable.exerciseGroup,
      })
      .from(schema.exerciseTable)
      .where(
        and(
          eq(schema.exerciseTable.id, exerciseId),
          eq(schema.exerciseTable.workoutId, workoutId),
        ),
      )
      .get();

    const randomExerciseId = availableExercisesWithoutGroup[0].id;
    const newExerciseGroup = newGroup.exerciseGroup;

    // remove current exercise from group
    await this.db
      .update(schema.exerciseTable)
      .set({ exerciseGroup: '' })
      .where(eq(schema.exerciseTable.id, exerciseId));

    // add new random exercise to group
    await this.db
      .update(schema.exerciseTable)
      .set({ exerciseGroup: newExerciseGroup })
      .where(eq(schema.exerciseTable.id, randomExerciseId));

    return this.getAll();
  }
}

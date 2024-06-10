import { Inject, Injectable } from '@nestjs/common';
import { Workout } from 'src/graphql';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '../db/migrations/schema';
import { eq } from 'drizzle-orm';
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
      .all();

    const mappedWorkouts = mapWorkouts(workouts);

    return mappedWorkouts;
  }
}

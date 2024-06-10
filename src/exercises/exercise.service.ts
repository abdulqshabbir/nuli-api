import { Inject, Injectable } from '@nestjs/common';
import { exerciseTable } from '../db/migrations/schema';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { Exercise } from 'src/graphql';
import * as schema from '../db/migrations/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class ExerciseService {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}
  async getAllByWorkoutId(workoutId: number): Promise<Exercise[]> {
    const exercises = await this.db
      .select({
        id: exerciseTable.id,
        workoutId: exerciseTable.workoutId,
        name: exerciseTable.name,
        sets: exerciseTable.sets,
        reps: exerciseTable.reps,
        equipment: exerciseTable.equipment,
        durationInMinutes: exerciseTable.durationInMinutes,
        exerciseGroup: exerciseTable.exerciseGroup,
      })
      .from(exerciseTable)
      .where(eq(exerciseTable.workoutId, workoutId));

    return exercises;
  }
  async getAll(): Promise<Exercise[]> {
    const exercises = await this.db
      .select({
        id: exerciseTable.id,
        workoutId: exerciseTable.workoutId,
        name: exerciseTable.name,
        sets: exerciseTable.sets,
        reps: exerciseTable.reps,
        equipment: exerciseTable.equipment,
        durationInMinutes: exerciseTable.durationInMinutes,
        exerciseGroup: exerciseTable.exerciseGroup,
      })
      .from(exerciseTable)
      .all();

    return exercises;
  }
}

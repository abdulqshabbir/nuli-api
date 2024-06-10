import { Module } from '@nestjs/common';
import { WorkoutResolver } from './workouts.resolver';
import { ExerciseModule } from '../exercises/exercise.module';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [ExerciseModule],
  providers: [WorkoutResolver, WorkoutsService],
})
export class WorkoutsModule {}

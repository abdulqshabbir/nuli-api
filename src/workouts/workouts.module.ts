import { Module } from '@nestjs/common';
import { WorkoutResolver } from './workouts.resolver';

@Module({
  providers: [WorkoutResolver],
})
export class WorkoutsModule {}

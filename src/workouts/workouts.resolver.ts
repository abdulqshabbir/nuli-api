import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkoutsService } from './workouts.service';

@Resolver('Workout')
export class WorkoutResolver {
  constructor(private workoutsService: WorkoutsService) {}
  @Query()
  async workouts() {
    const workouts = await this.workoutsService.getAll();
    return workouts;
  }
  @Mutation()
  async swapExercises(
    @Args('workoutId') workoutId: number,
    @Args('exerciseId') exerciseId: number,
  ) {
    const workouts = await this.workoutsService.swapExercises(
      workoutId,
      exerciseId,
    );
    return workouts;
  }
}

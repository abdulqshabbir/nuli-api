import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Workout')
export class WorkoutResolver {
  @Query()
  workouts() {
    return [
      {
        id: 1,
        name: 'Test Workout 1',
        description: 'Test workout 1 description',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }
}

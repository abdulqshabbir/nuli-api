import { Test, TestingModule } from '@nestjs/testing';
import * as schema from '../db/migrations/schema';
import { WorkoutsService } from './workouts.service';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import 'dotenv/config';

const WORKOUT_ID = 1;

describe('Workouts Service', () => {
  let service: WorkoutsService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DrizzleTursoModule.register({
          tag: 'DB',
          turso: {
            config: {
              url: process.env.TURSO_CONNECTION_URL,
              authToken: process.env.TURSO_AUTH_TOKEN,
            },
          },
          config: { schema: { ...schema } },
        }),
      ],
      providers: [WorkoutsService],
    }).compile();

    service = module.get<WorkoutsService>(WorkoutsService);
  });

  it('Workouts service should be defined', async () => {
    expect(service);
  });
  it('Workouts getAll() should return all exercises', async () => {
    const workouts = await service.getAll();
    expect(workouts).toBeDefined();
    expect(workouts.length).toBeGreaterThan(0);

    const workout = workouts.find((w) => w.id === WORKOUT_ID);
    expect(workout.id).toEqual(expect.any(Number));
    expect(workout.durationInMinutes).toEqual(expect.any(Number));
    expect(workout.numberOfExercises).toEqual(expect.any(Number));

    const exercises = workout.exercises;
    const firstExercise = exercises[0];
    expect(exercises).toBeDefined();
    expect(exercises.length).toBeGreaterThan(0);
    expect(firstExercise.id).toEqual(expect.any(Number));
    expect(firstExercise.name).toEqual(expect.any(String));
    expect(firstExercise.sets).toEqual(expect.any(Number));
    expect(firstExercise.reps).toEqual(expect.any(String));
    expect(firstExercise.equipment).toEqual(expect.any(String));
    expect(firstExercise.durationInMinutes).toEqual(expect.any(Number));
  });
});

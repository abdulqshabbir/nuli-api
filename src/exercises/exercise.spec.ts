import { Test, TestingModule } from '@nestjs/testing';
import * as schema from '../db/migrations/schema';
import { ExerciseService } from './exercise.service';
import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import 'dotenv/config';

const WORKOUT_ID = 1;

describe('Exercise Service', () => {
  let service: ExerciseService;
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
      providers: [ExerciseService],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('Exercise service should be defined', async () => {
    expect(service);
  });
  it('Exercises getAll() should return all exercises', async () => {
    const exercises = await service.getAll();
    expect(exercises).toBeDefined();
    expect(exercises.length).toBeGreaterThan(0);
    expect(exercises[0].id).toEqual(expect.any(Number));
    expect(exercises[0].name).toEqual(expect.any(String));
    expect(exercises[0].sets).toEqual(expect.any(Number));
    expect(exercises[0].reps).toEqual(expect.any(String));
    expect(exercises[0].equipment).toEqual(expect.any(String));
    expect(exercises[0].durationInMinutes).toEqual(expect.any(Number));
  });

  it('Exercis Service getAllByWorkoutId should return all exercises by workout id', async () => {
    const exercises = await service.getAllByWorkoutId(WORKOUT_ID);
    expect(exercises).toBeDefined();
    expect(new Set(exercises.map((e) => e.workoutId))).toEqual(
      new Set([WORKOUT_ID]),
    );
  });
});

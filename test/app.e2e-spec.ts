import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

const gql = '/graphql';

const barbellLungeExercise = {
  id: 1,
  name: 'Barbell Lunge (Left)',
  sets: 4,
  reps: '6-8 reps',
  equipment: 'BARBELL',
  durationInMinutes: 5,
};

describe('Workouts resolver', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns first workout with exercises', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
          # Write your query or mutation here
          query getWorkouts {
            workouts {
              id
              durationInMinutes
              numberOfExercises
              exercises {
                id
                name
                sets
                reps
                equipment
                durationInMinutes
              }
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.workouts[0].id).toBeDefined();
        expect(res.body.data.workouts[0].exercises).toBeDefined();
        const barbellLungeExerciseIdx =
          res.body.data.workouts[0].exercises.findIndex(
            (e) => e.name === 'Barbell Lunge (Left)',
          );
        expect(
          res.body.data.workouts[0].exercises[barbellLungeExerciseIdx],
        ).toEqual(barbellLungeExercise);
      });
  });
  it('correctly computes the total duration of first workout', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
          # Write your query or mutation here
          query getWorkouts {
            workouts {
              durationInMinutes
              exercises {
                durationInMinutes
              }
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.workouts[0].exercises).toBeDefined();
        const totalDurationOfExercises =
          res.body.data.workouts[0].exercises.reduce(
            (duration, exercise) => duration + exercise.durationInMinutes,
            0,
          );
        expect(res.body.data.workouts[0].durationInMinutes).toEqual(
          totalDurationOfExercises,
        );
      });
  });
  it('correctly returns the number of exercises for first workout', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: `
          # Write your query or mutation here
          query getWorkouts {
            workouts {
              id
              durationInMinutes
              exercises {
                id
                durationInMinutes
              }
            }
          }
        `,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.workouts[0].exercises).toBeDefined();
        const totalDurationOfExercises =
          res.body.data.workouts[0].exercises.reduce(
            (duration, exercise) => duration + exercise.durationInMinutes,
            0,
          );
        expect(res.body.data.workouts[0].durationInMinutes).toEqual(
          totalDurationOfExercises,
        );
      });
  });
});

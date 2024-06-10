import { Workout } from 'src/graphql';

type WorkoutBeforeMapping = {
  id: number;
  exerciseId: number;
  exerciseName: string;
  exerciseSets: number;
  exerciseReps: string;
  exerciseEquipment: string;
  exerciseDurationInMinutes: number;
  exerciseWeightRange: string;
  exerciseWorkoutId: number;
  exerciseGroup: string;
};

export function mapWorkouts(workouts: WorkoutBeforeMapping[]): Workout[] {
  const groupWorkoutsByWokoutId = workouts.reduce(
    (acc: Omit<Workout, 'durationInMinutes' | 'numberOfExercises'>[], curr) => {
      const workoutId = curr.id;
      const exercise = {
        id: curr.exerciseId,
        name: curr.exerciseName,
        sets: curr.exerciseSets,
        reps: curr.exerciseReps,
        equipment: curr.exerciseEquipment,
        durationInMinutes: curr.exerciseDurationInMinutes,
        weightRange: curr.exerciseWeightRange,
        workoutId: curr.exerciseWorkoutId,
        exerciseGroup: curr.exerciseGroup,
      };
      const workoutExists = acc.some((w) => w.id === workoutId);

      if (workoutExists) {
        const workoutIndex = acc.findIndex((w) => w.id === workoutId);
        acc[workoutIndex].exercises.push(exercise);
      } else {
        acc.push({
          id: workoutId,
          exercises: [exercise],
        });
      }
      return acc;
    },
    [],
  );

  const workoutsWithDurationAndExercises = groupWorkoutsByWokoutId.map((w) => {
    return {
      ...w,
      durationInMinutes: w.exercises.reduce(
        (accDuration, currExercise) =>
          accDuration + currExercise.durationInMinutes,
        0,
      ),
      numberOfExercises: w.exercises.length,
    };
  });

  return workoutsWithDurationAndExercises;
}

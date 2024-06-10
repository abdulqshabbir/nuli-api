
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export abstract class IQuery {
    abstract workouts(): Workout[] | Promise<Workout[]>;
}

export abstract class IMutation {
    abstract swapExercises(workoutId: number, exerciseId: number): Workout[] | Promise<Workout[]>;
}

export class Exercise {
    id: number;
    name: string;
    sets: number;
    reps: string;
    equipment?: Nullable<string>;
    durationInMinutes: number;
    workoutId: number;
    exerciseGroup: string;
}

export class Workout {
    id: number;
    durationInMinutes: number;
    numberOfExercises: number;
    exercises: Exercise[];
}

type Nullable<T> = T | null;


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

export class Workout {
    id: string;
    name: string;
    description?: Nullable<string>;
    createdAt: string;
    updatedAt: string;
}

type Nullable<T> = T | null;

# API documentation

### Database Design

Our database is hosted using [`Turso`](https://docs.turso.tech/introduction) which uses libSQL technology (a fork of SQLite). All the SQL needed to get the database ready is to run the `src/db/migrations/migrations.sql` file against the SQLite database.

Our database is currently made up of two tables the `workout_table` and the `exercise_table` both tables are described in typescript within the `schema.ts` file using an ORM called [`Drizzle`](https://orm.drizzle.team/docs/overview) allowing us to safely query our database in a type-safe manner.

The database design includes a `workout_table` to correspond to a single user workout which in-turn is a grouping of many exercises. Each exercise is held in the `exercise_table`. There is a one-to-many relationship between workouts and exercises using the `workout_id` foreign key on the exercise table. Time permitting, there would also be a user_table which would have a one to many relationship with the workout_table.

The exercise_table is at the core of this application. It is made up of the following columns:

- `name` (name of exercise - text)
- `sets` (number of sets to do - integer)
- `reps` (number of reps or rep range - text)
- `equipment` (equipment needed for exercise - text)
- `duration_in_minutes` (minutes needed to complete exercise - integer),
- `weight_range` (an optional text describing a suitable weight range for the exercise)
- `exercise_group` (text describing which group an exercise belongs to - e.g. triset, superset or circuit)

Time permitting, the `exercise_group` should be named `exercise_group_id` and be a foreign key to an `exercise_group` within the `exercise_group_table`.

### API

The API for the our mobile app uses GraphQL for communication between the front-end and back-end.

There is one query for the `workouts` which is consumed by the mobile app.

Here is a sample workouts query format:

```json
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
        workoutId
        exerciseGroup
      }
    }
  }

```

Here is a sample response (Note: some data has been omitted for brevity):

```json
{
  "data": {
    "workouts": [
      {
        "id": 1,
        "durationInMinutes": 5,
        "numberOfExercises": 1,
        "exercises": [
          {
            "id": 1,
            "name": "Barbell Lunge (Left)",
            "sets": 4,
            "reps": "6-8 reps",
            "equipment": "BARBELL",
            "durationInMinutes": 5,
            "workoutId": 1,
            "exerciseGroup": "circuit"
          }
        ]
      }
    ]
  }
}
```

Although the application only makes use of the first workout, in a full application likely there will be many and so the resolver function returns a list. Each workout has an `id`, `durationInMinutes` (resolver function computes the total duration of the workout based on the duration of individual exercises), `numberOfExercises` (the resolver function computes the total number of exercises associated with the workout), and exercises. For each exercise the client can query: `id`, `name`, `sets`, `reps`, `equipment`, `durationInMinutes`, `exerciseGroup`, `workoutId` and optionally a `weightRange`.

There is also one mutation called `swapExercises` which is used by the mobile app. This mutation takes the `workoutId` and `exerciseId` as arguments. The `workoutId` will uniquely identify a workout and an `exerciseId` will uniquely identity an exercise within that workout (assuming exercises are unique per workout). This mutation will simply look through the exercises table to check for exercises that do not have a “group”. It will then take the current exercise and remove its exercise_group and find an exercise without a group as a replacement.

Here is a sample request format for the `swapExercises` mutation:

```json
mutation swapExercises {
  swapExercises(workoutId:1, exerciseId:2){
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
        workoutId
        exerciseGroup
      }
  }
}
```

Here is the sample response for the `swapExercises` mutation (Note: some data has been omitted for brevity):

```json
{
  "data": {
    "swapExercises": [
      {
        "id": 1,
        "durationInMinutes": 5,
        "numberOfExercises": 1,
        "exercises": [
          {
            "id": 1,
            "name": "Barbell Lunge (Left)",
            "sets": 4,
            "reps": "6-8 reps",
            "equipment": "BARBELL",
            "durationInMinutes": 5,
            "workoutId": 1,
            "exerciseGroup": "circuit"
          }
        ]
      }
    ]
  }
}
```

### Authentication

Unfortunately, I did not have time to implement authentication. To set up a bare-bones authentication system we could sign up the user using a username and password. We could salt and hash the password and only store the hashed password in the db. When the user makes a request to login we can compare their username and plain text password against the hashed password in our db.

If they match we can encrypt the user (perhaps with their id, name and username) into a JWT token with a signing secret. The server can then send back this token to the client and store/retrieve it using the expo-secure-store API. The client can then send along the JWT token as an Authorization header with every request to the server which can decrypt and verify the identity of the user.

# Welcome to the backend nüli test app

For full instructions on what we'd like you to do please visit our [official developer test page](https://www.notion.so/nuliapp/Nuli-Mid-Level-Mobile-Developer-Test-83f53a4746824e4a8f924b8b9fc13d69#27bb0550be78474f830cfa65d552822d)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

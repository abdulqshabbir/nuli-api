BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `workout_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
CREATE TABLE IF NOT EXISTS `exercise_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`sets` integer NOT NULL,
	`reps` text NOT NULL,
	`equipment` text NOT NULL,
	`duration_in_minutes` integer NOT NULL,
	`weight_range` text,
	`workout_id` integer NOT NULL,
  `exercise_group` text NOT NULL,
	FOREIGN KEY (`workout_id`) REFERENCES `workout_table`(`id`) ON UPDATE no action ON DELETE cascade
);
INSERT INTO workout_table VALUES(1);
INSERT INTO workout_table VALUES(2);
INSERT INTO exercise_table VALUES(1,'Barbell Lunge (Left)',4,'6-8 reps','BARBELL',5,NULL,1, '');
INSERT INTO exercise_table VALUES(2,'Barbell Lunge (Right)',4,'6-8 reps','BARBELL',5,NULL,1, '');
INSERT INTO exercise_table VALUES(3,'Cable Kickback (Left)',3,'15 reps','CABLE',15,NULL,1, 'superset');
INSERT INTO exercise_table VALUES(4,'Cable Kickback (Right)',3,'15 reps','CABLE',15,NULL,1, 'superset');
INSERT INTO exercise_table VALUES(5,'Sumo Deadlift',4,'10-12 reps','BARBELL',20,'90kg',1, 'superset');
INSERT INTO exercise_table VALUES(6,'Dumbbell Shoulder Press',4,'8 reps','DUMBBELL',20,'18-25kg',1, 'superset');
INSERT INTO exercise_table VALUES(7,'Single Arm Cable Row (Left)',4,'10-12 reps','CABLE',10,NULL,1, 'triset');
INSERT INTO exercise_table VALUES(8,'Single Arm Cable Row (Right)',4,'10-12 reps','CABLE',10,NULL,1, 'triset');
INSERT INTO exercise_table VALUES(9,'Cable Seated Row',4,'6-8 reps','CABLE',15,NULL,1, 'triset');
INSERT INTO exercise_table VALUES(10,'Dumbbell Jump Squat',1,'1 rep','DUMBBELL',15,NULL,1, 'circuit');
INSERT INTO exercise_table VALUES(11,'Barbell Lunge',1,'1 rep','BARBELL',15,NULL,1, 'circuit');
INSERT INTO exercise_table VALUES(12,'Plank With Stability Ball',1,'20 sec','BALL',15,NULL,1, 'circuit');
INSERT INTO exercise_table VALUES(13,'Glute Bridge Hold',1,'40 sec','BALL',15,NULL,1, 'circuit');
COMMIT;

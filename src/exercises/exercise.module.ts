import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [],
  providers: [ExerciseService],
})
export class ExerciseModule {}

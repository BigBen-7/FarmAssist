import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropsController } from './crops.controller';
import { CropsService } from './crops.service';
import { Crop } from './entities/crop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crop])],
  controllers: [CropsController],
  providers: [CropsService],
  exports: [TypeOrmModule, CropsService],
})
export class CropsModule {}



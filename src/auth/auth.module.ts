import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DoctorModule } from 'src/doctor/doctor.module';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    DoctorModule,
    JwtModule.register({
      secret: 'starkhospital-secret', // Use env var in real apps
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

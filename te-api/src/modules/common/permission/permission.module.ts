import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from 'src/modules/system/auth/auth.module'
import { PermissionGuard } from './permission.guard'

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
  imports: [AuthModule],
})
export class PermissionModule {
}

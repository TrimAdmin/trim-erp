import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { PermissionModule } from '../common/permission/permission.module'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PermissionModule,
    RouterModule.register([
      {
        path: 'system',
        children: [
          AuthModule,
          UserModule,
        ],
      },
    ]),
  ],
})
export class SystemModule {
}

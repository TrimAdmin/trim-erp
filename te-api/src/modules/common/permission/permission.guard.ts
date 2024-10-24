import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from 'src/modules/system/auth/auth.service'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取接口所需权限
    const permissions = this.reflector.getAllAndOverride('permission', [context.getClass(), context.getHandler()])
    // 无需权限则放行
    if (!permissions)
      return true
    try {
      const request = context.switchToHttp().getRequest()
      const user = request.user
      const userPerms = await this.authService.getUserPermission(user.sub)
      if (
        // 特殊处理 放行全部权限
        userPerms.find((item) => item === '*:*')
        // 查找是否有所需权限
        || userPerms.map((item) => permissions.find((i) => i === item)).filter(Boolean).length
      ) {
        return true
      }
    }
    catch (e) {
      console.log(e)
      throw new HttpException('暂无权限，请联系管理员添加', HttpStatus.FORBIDDEN)
    }
  }
}

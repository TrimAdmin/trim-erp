import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { response } from 'src/utils/response'
import {
  UserCreateDto,
  UserQueryDto,
  UserUpdateDto,
} from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('系统-用户管理')
export class UserController {
  constructor(private userService: UserService) {
  }

  @Get('page')
  @ApiOperation({
    summary: '用户-分页列表',
  })
  async page(@Query() query: UserQueryDto) {
    const data = await this.userService.page(query)
    return response.ok(data)
  }

  @Post('create')
  @ApiOperation({
    summary: '用户-新建用户',
  })
  async create(@Body() data: UserCreateDto) {
    await this.userService.create(data)
    return response.ok()
  }

  @Put('update')
  @ApiOperation({
    summary: '用户-编辑用户',
  })
  async update(@Body() data: UserUpdateDto) {
    await this.userService.update(data)
    return response.ok()
  }

  @Delete('delete')
  @ApiOperation({
    summary: '用户-删除用户',
  })
  async delete(@Body() data: number[]) {
    await this.userService.delete(data)
    return response.ok()
  }
}

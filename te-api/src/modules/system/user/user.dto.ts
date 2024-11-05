import { PartialType } from '@nestjs/swagger'
import { Sex } from '@prisma/client'
import { IsNotEmpty } from 'class-validator'
import { PaginationDto } from 'src/modules/common/dto/pagination.dto'

export class UserQueryDto extends PaginationDto {
  username?: string
}

export class UserCreateDto {
  @IsNotEmpty({
    message: '用户名必填',
  })
  username: string

  password?: string
  email?: string
  phone?: string
  nickname?: string
  status?: number
  sex?: Sex
}

export class UserUpdateDto extends PartialType(UserCreateDto) {
  id: number
}

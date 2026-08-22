import { ApiResponse, ClientResult } from '@/types/api.types';
import { SafeUserDTO } from '@/types/dtos.types';

export type PostLoginUserParams = {
  email: string
  password: string
}
export type PostLoginUserReturn = Promise<
  ClientResult<ApiResponse<SafeUserDTO>>
>

export type PostRegisterUserParams = {
  email: string
  name: string
  password: string
}
export type PostRegisterUserReturn = Promise<ClientResult<ApiResponse<SafeUserDTO>>>

export type GetCurrentUserReturn = Promise<ClientResult<ApiResponse<SafeUserDTO>>>
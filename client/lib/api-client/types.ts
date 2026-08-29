import { ApiResponse, ClientResult } from '@/types/api.types';
import { ProductDTO, UserDTO } from '@/types/dtos.types'

export type PostLoginUserParams = {
  email: string
  password: string
}
export type PostLoginUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostRegisterUserParams = {
  email: string
  name: string
  password: string
}
export type PostRegisterUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostLogoutUserReturn = Promise<
  ClientResult<ApiResponse<null>>
>

export type GetCurrentUserReturn = Promise<ClientResult<ApiResponse<UserDTO>>>

export type PostProductParams = {
  title: string
  price: string | number
}

export type PostProductReturn = Promise<ClientResult<ApiResponse<ProductDTO>>>
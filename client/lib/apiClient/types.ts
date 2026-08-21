import { ApiResponse, ClientResult } from '@/types/api.types';
import { SafeUserDTO } from '@/types/dtos.types';

export type PostRegisterUserParams = {
  email: string
  name: string
  password: string
}
export type PostRegisterUserReturn = Promise<ClientResult<ApiResponse<SafeUserDTO>>>
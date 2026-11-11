import type { HydratedDocument, InferSchemaType } from 'mongoose';
import { model, Schema  } from 'mongoose'

export type BaseUserDocument = {
  createdAt: Date
  email: string
  isCreator: boolean
  name: string
  passwordHash: string
  updatedAt: Date
}

const userSchema = new Schema<BaseUserDocument>(
  {
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    isCreator: {
      default: false,
      type: Boolean,
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
    passwordHash: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

export const UserModel = model<BaseUserDocument>('User', userSchema)

export type UserSchemaType = InferSchemaType<typeof userSchema>
export type DbUserDocument = HydratedDocument<UserSchemaType>
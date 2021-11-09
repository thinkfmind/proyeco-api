import { Schema, model } from 'mongoose';

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
  picture?: string;
  tag?: string;
  trash?: boolean;
  createdAt?: string;
}

export interface UserAuth extends Pick<User, 'username' | 'password'> {
  ipAddress: string;
}

export interface UserOrganization extends User {
  lines: string[];
}

const schema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'Empresa' },
    picture: { type: String },
    tag: { type: String, default: 'Usuario' },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const UserModel = model<User>('User', schema);

export default UserModel;

// library: [{ type: Schema.Types.ObjectId, ref: "Chapter", default: [] }],

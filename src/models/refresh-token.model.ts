import { Schema, model } from 'mongoose';

export interface RefreshToken {
  user: string;
  token: string;
  expires: string;
  created: string;
  createdByIp: string;
  revoked: number;
  revokedByIp: string;
  replacedByToken: string;
}

export interface RefreshTokenAuth
  extends Pick<RefreshToken, 'token'> {
  ipAddress: string;
}

const schema = new Schema<RefreshToken>({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created: { type: Date, default: Date.now },
  createdByIp: String,
  revoked: Date,
  revokedByIp: String,
  replacedByToken: String,
});

schema.virtual('isExpired').get(function (this: { expires: number }) {
  return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function (this: { revoked: boolean; isExpired: boolean }) {
  return !this.revoked && !this.isExpired;
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc: any, ret: any) => {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  },
});

const RefreshToken = model<RefreshToken>('RefreshToken', schema);

export default RefreshToken;

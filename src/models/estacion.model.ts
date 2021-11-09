import { Schema, model } from 'mongoose';

export interface Estacion {
  id: string;
  name: string;
  empresa: string;
  linea: string;
}

const schema = new Schema<Estacion>(
  {
    name: { type: String, required: true },
    linea: { type: Schema.Types.ObjectId, ref: "Linea", required: true },
    empresas: { type:[ Schema.Types.ObjectId], ref: "User", default: [] },
    tag: { type: String, default: "Estacion" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const EstacionModel = model<Estacion>('Estacion', schema);

export default EstacionModel;

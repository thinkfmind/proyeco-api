import { Schema, model } from 'mongoose';

export interface Linea {
  id: string;
  name: string;
  empresas: string;
  estaciones: string;
  tag?: string;
}

const schema = new Schema<Linea>(
  {
    name: { type: String, required: true },
    lugar: { type: String, required: true },
    empresas: { type:[ Schema.Types.ObjectId], ref: "User", default: [] },
    estaciones: { type: [Schema.Types.ObjectId], ref: "Estacion", default: [] },
    tag: { type: String, default: "Linea" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const LineaModel = model<Linea>('Linea', schema);

export default LineaModel;
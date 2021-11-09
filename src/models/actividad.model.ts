import { Schema, model } from 'mongoose';

export interface Actividad {
  id: string;
  empresa: string;
  equipo: string;
  linea: string;
  estacion: string;
  tipo: string;
  detalles: string;
  fecha: Date;
  dias: number;
  trash?: boolean;
  tag?: string;
}

const schema = new Schema<Actividad>(
  {
    empresa: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    equipo: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
    linea: { type: Schema.Types.ObjectId, ref: 'Linea', required: true },
    estacion: { type: Schema.Types.ObjectId, ref: 'Estacion', required: true },
    tipo: { type: String, required: true },
    detalles: { type: String, default: "" },
    fecha: { type: Date, required: true },
    dias: { type: Number, required: true },
    tag: { type: String, default: "Actividad" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const ActividadModel = model<Actividad>('Actividad', schema);

export default ActividadModel;

import { Schema, model } from 'mongoose';

export interface Equipo {
  id: string;
  name: string;
  linea: string;
  estacion: string;
  empresa: string;
  identificacion: string;
  modelo: string;
  tipo: string;
  detalles: string;
  imagenUno?: string;
  imagenDos?: string;
  imagenTres?: string;
  historico?: string;
  historicoId?: string;
  estado: string;
  funciona: boolean;
  tag?: string;
  trash?: boolean;
}

export interface EquipoCreate extends Omit<Equipo, 'id'> {
  ipAddress: string;
}

const schema = new Schema<Equipo>(
  {
    name: { type: String, required: true },
    linea: { type: Schema.Types.ObjectId, ref: 'Linea', required: true },
    estacion: { type: Schema.Types.ObjectId, ref: 'Estacion', required: true },
    empresa: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    identificacion: { type: String, required: true, unique: true },
    modelo: { type: String, default: '' },
    tipo: { type: String, default: '' },
    detalles: { type: String, default: '' },
    imagenUno: { type: String, default: '' },
    imagenDos: { type: String, default: '' },
    imagenTres: { type: String, default: '' },
    historico: { type: String, default: '' },
    historicoId: { type: String, default: '' },
    estado: { type: String, required: true },
    funciona: { type: Boolean, required: true },
    tag: { type: String, default: "Equipo" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const EquipoModel = model<Equipo>('Equipo', schema);

export default EquipoModel;

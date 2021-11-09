import { Schema, model } from 'mongoose';

export interface Historico {
  id: string;
  empresa: string;
  equipo: string;
  linea: string;
  estacion: string;
  url: string;
  key: string;
  tag?: string;
  trash?: boolean;
}

const schema = new Schema<Historico>(
  {
    empresa: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    equipo: { type: Schema.Types.ObjectId, ref: 'Equipo', required: true },
    linea: { type: Schema.Types.ObjectId, ref: 'Linea', required: true },
    estacion: { type: Schema.Types.ObjectId, ref: 'Estacion', required: true },
    url: { type: String, default: '' },
    key: { type: String, default: '' },
    tag: { type: String, default: "Historico" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const HistoricoModel = model<Historico>('Historico', schema);

export default HistoricoModel;

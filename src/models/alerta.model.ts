import { Schema, model } from 'mongoose';

export interface Alerta {
  id: string;
  equipo: string;
  linea: string;
  estacion: string;
  from: string;
  to: string;
  asunto: string;
  mensaje: string;
  trash?: boolean;
  tag?: string;
}

const schema = new Schema<Alerta>(
  {
    equipo: { type: String, required: true },
    linea: { type: Schema.Types.ObjectId, ref: 'Linea', required: true },
    estacion: { type: Schema.Types.ObjectId, ref: 'Estacion', required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    asunto: { type: String, required: true },
    mensaje: { type: String, required: true },
    tag: { type: String, default: "Alerta" },
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

schema.set('toJSON', { virtuals: true });
const AlertaModel = model<Alerta>('Alerta', schema);

export default AlertaModel;

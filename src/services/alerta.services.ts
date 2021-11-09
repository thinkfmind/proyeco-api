import { db } from '../helpers/db';

export async function create(alerta: any) {
  const equipo = await db.Equipo.findOne({identificacion: alerta.equipo})
  alerta.equipo = equipo.name
  return await db.Alerta.create(alerta);
}

export async function editAlerta(id: any, data: any) {
  return await db.Alerta.findOneAndUpdate({ _id: id }, data);
}

export async function getAlerta(id: any) {
  return await db.Alerta.findById(id);
}

export async function getAlertas() {
  return await db.Alerta.find()
    .populate('linea', 'name')
    .populate('estacion', 'name')
    .exec();
}
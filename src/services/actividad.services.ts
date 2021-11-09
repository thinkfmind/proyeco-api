import { db } from '../helpers/db';

export async function create(actividad: any) {
  const equipo = await db.Equipo.findOne({ identificacion: actividad.equipo });
  if (!equipo) throw new Error('No se encontro un equipo con ese identificador');

  actividad.equipo = equipo.id;

  return await db.Actividad.create(actividad);
}

export async function editActividad(id: string, data: any) {
  const equipo = await db.Equipo.findOne({ identificacion: data.equipo });
  if (!equipo) throw new Error('No se encontro un equipo con ese identificador');

  data.equipo = equipo.id;

  return await db.Actividad.findOneAndUpdate({ _id: id }, data);
}

export async function getActividad(id: string) {
  return await db.Actividad.findById(id)
    .populate('equipo', 'identificacion')
    .populate('empresa', 'name');
}

export async function getActividades() {
  return await db.Actividad.find({ trash: false })
    .populate('empresa', 'name')
    .populate('linea')
    .populate('estacion', 'name')
    .populate('equipo')
    .exec();
}

export async function getActividadesOnTrash() {
  return await db.Actividad.find({ trash: true })
    .populate('linea')
    .populate('estacion', 'name')
    .populate('equipo')
    .exec();
}

export async function getActividadbyEquipo(id: any) {
  return await db.Actividad.find({ equipo: id });
}

export async function getActividadbyEmpresa(id: any) {
  return await db.Actividad.find({ empresa: id })
    .populate('empresa', 'name')
    .populate('linea')
    .populate('estacion', 'name')
    .populate('equipo')
    .exec();
}

export async function trashActividad(id: any, data: any) {
  await db.Actividad.findOneAndUpdate({ _id: id }, { trash: data.state });
}

export async function deleteActividad(id: any) {
  await db.Actividad.deleteOne({ _id: id });
}

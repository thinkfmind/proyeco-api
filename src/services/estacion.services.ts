import { db } from '../helpers/db';

export async function create({ name, linea }: { name: any; linea: any }) {
  const estacion = await db.Estacion.create({ name, linea });
  await db.Linea.findOneAndUpdate({ _id: linea }, { $push: { estaciones: estacion.id } });
}

export async function getEstaciones() {
  return await db.Estacion.find();
}

export async function getEstacionesByEmpresa(empresa: any) {
  return await db.Estacion.find({ empresa });
}

import { db } from '../helpers/db';

export async function create({ name, lugar }: { name: any; lugar: any }) {
  // await db.Linea.create({ name, lugar });
  return await db.Linea.create({ name, lugar });
  // await db.User.findOneAndUpdate({ _id: empresa }, { $push: { lineas: linea.id } });
}

export async function getLineas() {
  return await db.Linea.find();
}

export async function getLineasByEmpresa(empresa: any) {
  return await db.Linea.find({ empresa });
}

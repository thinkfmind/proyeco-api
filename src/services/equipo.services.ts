import { db } from '../helpers/db';
import { EquipoCreate } from '../models/equipo.model';
import { uploadS3 } from '../helpers/s3.helper';

export async function create(equipo: EquipoCreate, documentFiles: any) {
  const equipoIdentifier = await db.Equipo.findOne({ identificacion: equipo.identificacion });
  if (equipoIdentifier) throw new Error('Ya existe el identificador de equipo');

  if (documentFiles[0]) {
    const upload = await uploadS3(documentFiles[0], 'equipos');
    equipo.imagenUno = upload ? upload.Location : '';
  }

  if (documentFiles[1]) {
    const upload = await uploadS3(documentFiles[1], 'equipos');
    equipo.imagenDos = upload ? upload.Location : '';
  }

  if (documentFiles[2]) {
    const upload = await uploadS3(documentFiles[2], 'equipos');
    equipo.imagenTres = upload ? upload.Location : '';
  }

  const linea = await db.Linea.findOne({ _id: equipo.linea });
  if (!linea.empresas.includes(equipo.empresa)) {
    await db.Linea.findOneAndUpdate({ _id: equipo.linea }, { $push: { empresas: equipo.empresa } });
  }

  const estacion = await db.Estacion.findOne({ _id: equipo.estacion });
  if (!estacion.empresas.includes(estacion.empresa)) {
    await db.Estacion.findOneAndUpdate({ _id: equipo.estacion }, { $push: { empresas: equipo.empresa } });
  }

  return await db.Equipo.create(equipo);
}

export async function updateEquipo(equipo: EquipoCreate, documentFiles: any, id: string) {
  const eq = await db.Equipo.findById(id);

  if (!eq) throw new Error('No se encontro el equipo');

  const lineaVieja = await db.Linea.findOne({ _id: eq.linea });
  if (lineaVieja.empresas.includes(eq.empresa)) {
    await db.Linea.findOneAndUpdate({ _id: eq.linea }, { $pull: { empresas: eq.empresa } });
  }

  const estacionVieja = await db.Estacion.findOne({ _id: eq.estacion });
  if (estacionVieja.empresas.includes(eq.empresa)) {
    await db.Estacion.findOneAndUpdate({ _id: eq.estacion }, { $pull: { empresas: eq.empresa } });
  }

  if (documentFiles[0]) {
    const upload = await uploadS3(documentFiles[0], 'equipos');
    
    if(documentFiles[0].fieldname === "imagenUno") {
      equipo.imagenUno = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[0].fieldname === "imagenDos") {
      equipo.imagenDos = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[0].fieldname === "imagenTres") {
      equipo.imagenTres = upload ? upload.Location : eq.imagenUno;
    }

    
  }

  if (documentFiles[1]) {
    const upload = await uploadS3(documentFiles[1], 'equipos');
    
    if(documentFiles[1].fieldname === "imagenUno") {
      equipo.imagenUno = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[1].fieldname === "imagenDos") {
      equipo.imagenDos = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[1].fieldname === "imagenTres") {
      equipo.imagenTres = upload ? upload.Location : eq.imagenUno;
    }
  }

  if (documentFiles[2]) {
    const upload = await uploadS3(documentFiles[2], 'equipos');
    
    if(documentFiles[2].fieldname === "imagenUno") {
      equipo.imagenUno = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[2].fieldname === "imagenDos") {
      equipo.imagenDos = upload ? upload.Location : eq.imagenUno;
    }

    if(documentFiles[2].fieldname === "imagenTres") {
      equipo.imagenTres = upload ? upload.Location : eq.imagenUno;
    }
  }

  const linea = await db.Linea.findOne({ _id: equipo.linea });
  if (!linea.empresas.includes(equipo.empresa)) {
    await db.Linea.findOneAndUpdate({ _id: equipo.linea }, { $push: { empresas: equipo.empresa } });
  }

  const estacion = await db.Estacion.findOne({ _id: equipo.estacion });
  if (!estacion.empresas.includes(equipo.empresa)) {
    await db.Estacion.findOneAndUpdate({ _id: equipo.estacion }, { $push: { empresas: equipo.empresa } });
  }

  return await db.Equipo.findOneAndUpdate({ _id: id }, equipo);
}

export async function getEquipos() {
  return await db.Equipo.find({ trash: false })
    .populate('linea')
    .populate('estacion', 'name')
    .populate('empresa', 'name')
    .exec();
}

export async function getEquiposByEmpresa(id: any) {
  return await db.Equipo.find({ empresa: id  })
    .populate('linea')
    .populate('estacion', 'name')
    .populate('empresa', 'name')
    .exec();
}

export async function getEquipo(id: any) {
  return await db.Equipo.findById(id)
    .populate('linea')
    .populate('estacion', 'name')
    .populate('empresa', 'name')
    .exec();
}

export async function getEquiposOnTrash() {
  return await db.Equipo.find({ trash: true })
    .populate('linea')
    .populate('estacion', 'name')
    .populate('empresa', 'name')
    .exec();
}

export async function trashEquipo(id: any, data: any) {
  await db.Equipo.findOneAndUpdate({ _id: id }, { trash: data.state });
}

export async function deleteEquipo(id: any) {
  const search = await db.Equipo.findById(id);

  await db.Historico.deleteMany({ equipo: search.id });
  await db.Actividad.deleteMany({ equipo: search.id });

  await db.Linea.findOneAndUpdate({ _id: search.linea }, { $pull: { empresas: search.empresa } });
  await db.Estacion.findOneAndUpdate({ _id: search.estacion }, { $pull: { empresas: search.empresa } });

  await db.Equipo.deleteOne({ _id: id });
}

import { db } from '../helpers/db';
import { uploadPdfS3, getFromS3 } from '../helpers/s3.helper';

export async function create(historico: any, file: any) {
  const equipo = await db.Equipo.findOne({ identificacion: historico.equipo }).populate(
    'empresa',
    'name'
  );
  if (!equipo) throw new Error('No se encontro un equipo con ese identificador');

  historico.equipo = equipo.id;

  if (file) {
    const upload = await uploadPdfS3(file, equipo.name, equipo.empresa.name);
    historico.url = upload ? upload.Location : '';
    historico.key = upload ? upload.Key : '';

    const newHistorico = await db.Historico.create(historico);
    await db.Equipo.findOneAndUpdate(
      { _id: equipo.id },
      { historico: upload.Key, historicoId: newHistorico.id }
    );
    return newHistorico;
  }

  throw new Error('Seleccione un pdf');
}

export async function updateHistorico(id: string, historico: any, file: any) {
  const equipo = await db.Equipo.findOne({ identificacion: historico.equipo }).populate(
    'empresa',
    'name'
  );
  if (!equipo) throw new Error('No se encontro un equipo con ese identificador');

  historico.equipo = equipo.id;

  if (file) {
    const upload = await uploadPdfS3(file, equipo.name, equipo.empresa.name);
    historico.url = upload ? upload.Location : '';
    historico.key = upload ? upload.Key : '';
    await db.Equipo.findOneAndUpdate({ _id: equipo.id }, { historico: upload.Key });

    return await db.Historico.findOneAndUpdate({ _id: id }, historico);
  }

  delete historico.file;
  return await db.Equipo.findOneAndUpdate({ _id: equipo.id }, historico);
}

export async function getHistorico(id: string) {
  return await db.Historico.findById(id)
    .populate('equipo', 'identificacion')
    .populate('empresa', 'name');
}

export async function getHistoricos() {
  return await db.Historico.find()
    .populate('linea', 'name')
    .populate('estacion', 'name')
    .populate('empresa', 'name')
    .exec();
}

export async function getPdfHistorico() {
  return await db.Historico.find();
}

export async function getZipHistorico(data: any, res: any) {
  console.log(data.keys);
  const mfStream = getFromS3(data.keys);
  await mfStream.pipe(res);
  await mfStream.finalize();
}

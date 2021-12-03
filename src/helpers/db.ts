import mongoose from 'mongoose';
import User from '../models/user.model';
import RefreshToken from '../models/refresh-token.model';
import Linea from '../models/linea.model';
import Estacion from '../models/estacion.model';
import Equipo from '../models/equipo.model';
import Alerta from '../models/alerta.model';
import Historico from '../models/historico.model';
import Actividad from '../models/actividad.model';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const mongoUri: string = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb://DEV_ENV';

mongoose.connect(mongoUri, connectionOptions).then(() => migration());

const migration = async () => {
  const documents = await Linea.countDocuments();
  if (documents === 0) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10);
    await User.create({username: 'admin', password, name: "Admin", role: "Admin", picture: ''})
    const linea1 = await Linea.create({ name: 'Línea 1', lugar: 'Undefined' });
    const linea2 = await Linea.create({ name: 'Línea 2', lugar: 'Undefined' });
    const linea3 = await Linea.create({ name: 'Línea 3', lugar: 'Undefined' });
    const linea4 = await Linea.create({ name: 'Línea 4', lugar: 'Undefined' });
    const linea5 = await Linea.create({ name: 'Línea 5', lugar: 'Undefined' });
    const linea6 = await Linea.create({ name: 'Línea 6', lugar: 'Undefined' });
    const linea7 = await Linea.create({ name: 'Línea 7', lugar: 'Undefined' });
    const linea8 = await Linea.create({ name: 'Línea 8', lugar: 'Undefined' });
    const linea9 = await Linea.create({ name: 'Línea 9', lugar: 'Undefined' });
    const lineaA = await Linea.create({ name: 'Línea A', lugar: 'Undefined' });
    const lineaB = await Linea.create({ name: 'Línea B', lugar: 'Undefined' });
    const linea12 = await Linea.create({ name: 'Línea 12', lugar: 'Undefined' });
    await Estacion.create({ name: 'Pantitlán', linea: linea1.id });
    await Estacion.create({ name: 'Zaragoza', linea: linea1.id });
    await Estacion.create({ name: 'Gómez Farías', linea: linea1.id });
    await Estacion.create({ name: 'Boulevard Puerto Aéreo', linea: linea1.id });
    await Estacion.create({ name: 'Balbuena', linea: linea1.id });
    await Estacion.create({ name: 'Monctezuma', linea: linea1.id });
    await Estacion.create({ name: 'San Lázaro', linea: linea1.id });
    await Estacion.create({ name: 'Candelaria', linea: linea1.id });
    await Estacion.create({ name: 'Merced', linea: linea1.id });
    await Estacion.create({ name: 'Pino Suárez', linea: linea1.id });
    await Estacion.create({ name: 'Isabel la Católica', linea: linea1.id });
    await Estacion.create({ name: 'Salto del Agua', linea: linea1.id });
    await Estacion.create({ name: 'Balderas', linea: linea1.id });
    await Estacion.create({ name: 'Cuauhtémoc', linea: linea1.id });
    await Estacion.create({ name: 'Insurgentes', linea: linea1.id });
    await Estacion.create({ name: 'Sevilla', linea: linea1.id });
    await Estacion.create({ name: 'Chapultepec', linea: linea1.id });
    await Estacion.create({ name: 'Juanacatlán', linea: linea1.id });
    await Estacion.create({ name: 'Tacubaya', linea: linea1.id });
    await Estacion.create({ name: 'Observatorio', linea: linea1.id });
    await Estacion.create({ name: 'Cuatro Caminos', linea: linea2.id });
    await Estacion.create({ name: 'Panteones', linea: linea2.id });
    await Estacion.create({ name: 'Tacuba', linea: linea2.id });
    await Estacion.create({ name: 'Cuitláhuac', linea: linea2.id });
    await Estacion.create({ name: 'Popotla', linea: linea2.id });
    await Estacion.create({ name: 'Colegio Militar', linea: linea2.id });
    await Estacion.create({ name: 'Normal', linea: linea2.id });
    await Estacion.create({ name: 'San Cosme', linea: linea2.id });
    await Estacion.create({ name: 'Revolución', linea: linea2.id });
    await Estacion.create({ name: 'Pino Suárez', linea: linea2.id });
    await Estacion.create({ name: 'Hidalgo', linea: linea2.id });
    await Estacion.create({ name: 'Bellas Artes', linea: linea2.id });
    await Estacion.create({ name: 'Allende', linea: linea2.id });
    await Estacion.create({ name: 'Ermita', linea: linea2.id });
    await Estacion.create({ name: 'Zócalo/Tenochtitlan', linea: linea2.id });
    await Estacion.create({ name: 'San Antonio Abad', linea: linea2.id });
    await Estacion.create({ name: 'Chabacano', linea: linea2.id });
    await Estacion.create({ name: 'Viaducto', linea: linea2.id });
    await Estacion.create({ name: 'Xola', linea: linea2.id });
    await Estacion.create({ name: 'Villa de Cortés', linea: linea2.id });
    await Estacion.create({ name: 'Nativitas', linea: linea2.id });
    await Estacion.create({ name: 'Portales', linea: linea2.id });
    await Estacion.create({ name: 'General Anaya', linea: linea2.id });
    await Estacion.create({ name: 'Tasqueña', linea: linea2.id });
    await Estacion.create({ name: 'Indios Verdes', linea: linea3.id });
    await Estacion.create({ name: 'Deportivo 18 de Marzo', linea: linea3.id });
    await Estacion.create({ name: 'Potrero', linea: linea3.id });
    await Estacion.create({ name: 'La Raza', linea: linea3.id });
    await Estacion.create({ name: 'Tlatelolco', linea: linea3.id });
    await Estacion.create({ name: 'Guerrero', linea: linea3.id });
    await Estacion.create({ name: 'Hidalgo', linea: linea3.id });
    await Estacion.create({ name: 'Juárez', linea: linea3.id });
    await Estacion.create({ name: 'Balderas', linea: linea3.id });
    await Estacion.create({ name: 'Niños Héroes', linea: linea3.id });
    await Estacion.create({ name: 'Hospital General', linea: linea3.id });
    await Estacion.create({ name: 'Centro Médico', linea: linea3.id });
    await Estacion.create({ name: 'Etiopía', linea: linea3.id });
    await Estacion.create({ name: 'Eugenia', linea: linea3.id });
    await Estacion.create({ name: 'División del Norte', linea: linea3.id });
    await Estacion.create({ name: 'Coyoacán', linea: linea3.id });
    await Estacion.create({ name: 'Viveros', linea: linea3.id });
    await Estacion.create({ name: 'Zapata', linea: linea3.id });
    await Estacion.create({ name: 'Miguel Ángel de Quevedo', linea: linea3.id });
    await Estacion.create({ name: 'Copilco', linea: linea3.id });
    await Estacion.create({ name: 'Universidad', linea: linea3.id });
    await Estacion.create({ name: 'Martín Carrera', linea: linea4.id });
    await Estacion.create({ name: 'Talismán', linea: linea4.id });
    await Estacion.create({ name: 'Bondojito', linea: linea4.id });
    await Estacion.create({ name: 'Consulado', linea: linea4.id });
    await Estacion.create({ name: 'Canal del Norte', linea: linea4.id });
    await Estacion.create({ name: 'Morelos', linea: linea4.id });
    await Estacion.create({ name: 'Candelaria', linea: linea4.id });
    await Estacion.create({ name: 'Fray Servando', linea: linea4.id });
    await Estacion.create({ name: 'Jamaica', linea: linea4.id });
    await Estacion.create({ name: 'Santa Anita', linea: linea4.id });
    await Estacion.create({ name: 'Pantitlán', linea: linea5.id });
    await Estacion.create({ name: 'Hangares', linea: linea5.id });
    await Estacion.create({ name: 'Terminal Aérea', linea: linea5.id });
    await Estacion.create({ name: 'Oceanía', linea: linea5.id });
    await Estacion.create({ name: 'Aragón', linea: linea5.id });
    await Estacion.create({ name: 'Eduardo Molina', linea: linea5.id });
    await Estacion.create({ name: 'Consulado', linea: linea5.id });
    await Estacion.create({ name: 'Valle Gómez', linea: linea5.id });
    await Estacion.create({ name: 'Misterios', linea: linea5.id });
    await Estacion.create({ name: 'La Raza', linea: linea5.id });
    await Estacion.create({ name: 'Autobuses del Norte', linea: linea5.id });
    await Estacion.create({ name: 'Instituto del Petróleo', linea: linea5.id });
    await Estacion.create({ name: 'Politécnico', linea: linea5.id });
    await Estacion.create({ name: 'El Rosario', linea: linea6.id });
    await Estacion.create({ name: 'Tezozómoc', linea: linea6.id });
    await Estacion.create({ name: 'UAM-Azcapotzalco', linea: linea6.id });
    await Estacion.create({ name: 'Ferrería', linea: linea6.id });
    await Estacion.create({ name: 'Norte 45', linea: linea6.id });
    await Estacion.create({ name: 'Vallejo', linea: linea6.id });
    await Estacion.create({ name: 'Instituto del Petróleo', linea: linea6.id });
    await Estacion.create({ name: 'Lindavista', linea: linea6.id });
    await Estacion.create({ name: 'Deportivo 18 de Marzo', linea: linea6.id });
    await Estacion.create({ name: 'La Villa-Basílica', linea: linea6.id });
    await Estacion.create({ name: 'Martín Carrera', linea: linea6.id });
    await Estacion.create({ name: 'El Rosario', linea: linea7.id });
    await Estacion.create({ name: 'Aquiles Serdán', linea: linea7.id });
    await Estacion.create({ name: 'Camarones', linea: linea7.id });
    await Estacion.create({ name: 'Refinería', linea: linea7.id });
    await Estacion.create({ name: 'Tacuba', linea: linea7.id });
    await Estacion.create({ name: 'San Joaquín', linea: linea7.id });
    await Estacion.create({ name: 'Polanco', linea: linea7.id });
    await Estacion.create({ name: 'Auditorio', linea: linea7.id });
    await Estacion.create({ name: 'Constituyentes', linea: linea7.id });
    await Estacion.create({ name: 'Tacubaya', linea: linea7.id });
    await Estacion.create({ name: 'San Pedro de los Pinos', linea: linea7.id });
    await Estacion.create({ name: 'San Antonio', linea: linea7.id });
    await Estacion.create({ name: 'Mixcoac', linea: linea7.id });
    await Estacion.create({ name: 'Barranca del Muerto', linea: linea7.id });
    await Estacion.create({ name: 'Garibaldi', linea: linea8.id });
    await Estacion.create({ name: 'Bellas Artes', linea: linea8.id });
    await Estacion.create({ name: 'San Juan de Letrán', linea: linea8.id });
    await Estacion.create({ name: 'Salto del Agua', linea: linea8.id });
    await Estacion.create({ name: 'Doctores', linea: linea8.id });
    await Estacion.create({ name: 'Obrera', linea: linea8.id });
    await Estacion.create({ name: 'Chabacano', linea: linea8.id });
    await Estacion.create({ name: 'La Viga', linea: linea8.id });
    await Estacion.create({ name: 'Santa Anita', linea: linea8.id });
    await Estacion.create({ name: 'Coyuya', linea: linea8.id });
    await Estacion.create({ name: 'Iztacalco', linea: linea8.id });
    await Estacion.create({ name: 'Apatlaco', linea: linea8.id });
    await Estacion.create({ name: 'Aculco', linea: linea8.id });
    await Estacion.create({ name: 'Escuadrón 201', linea: linea8.id });
    await Estacion.create({ name: 'Atlalilco', linea: linea8.id });
    await Estacion.create({ name: 'Iztapalapa', linea: linea8.id });
    await Estacion.create({ name: 'Cerro de la Estrella', linea: linea8.id });
    await Estacion.create({ name: 'UAM-I', linea: linea8.id });
    await Estacion.create({ name: 'Constitución de 1917', linea: linea8.id });
    await Estacion.create({ name: 'Tacubaya', linea: linea9.id });
    await Estacion.create({ name: 'Patriotismo', linea: linea9.id });
    await Estacion.create({ name: 'Chilpancingo', linea: linea9.id });
    await Estacion.create({ name: 'Centro Médico', linea: linea9.id });
    await Estacion.create({ name: 'Lázaro Cárdenas', linea: linea9.id });
    await Estacion.create({ name: 'Chabacano', linea: linea9.id });
    await Estacion.create({ name: 'Jamaica', linea: linea9.id });
    await Estacion.create({ name: 'Mixiuhca', linea: linea9.id });
    await Estacion.create({ name: 'Velódromo', linea: linea9.id });
    await Estacion.create({ name: 'Ciudad Deportiva', linea: linea9.id });
    await Estacion.create({ name: 'Puebla', linea: linea9.id });
    await Estacion.create({ name: 'Pantitlán', linea: linea9.id });
    await Estacion.create({ name: 'Pantitlán', linea: lineaA.id });
    await Estacion.create({ name: 'Agrícola Oriental', linea: lineaA.id });
    await Estacion.create({ name: 'Canal de San Juan', linea: lineaA.id });
    await Estacion.create({ name: 'Tepalcates', linea: lineaA.id });
    await Estacion.create({ name: 'Guelatao', linea: lineaA.id });
    await Estacion.create({ name: 'Peñón Viejo', linea: lineaA.id });
    await Estacion.create({ name: 'Acatitla', linea: lineaA.id });
    await Estacion.create({ name: 'Santa Marta', linea: lineaA.id });
    await Estacion.create({ name: 'Los Reyes', linea: lineaA.id });
    await Estacion.create({ name: 'La Paz', linea: lineaA.id });
    await Estacion.create({ name: 'Ciudad Azteca', linea: lineaB.id });
    await Estacion.create({ name: 'Plaza Aragón', linea: lineaB.id });
    await Estacion.create({ name: 'Olímpica', linea: lineaB.id });
    await Estacion.create({ name: 'Ecatepec', linea: lineaB.id });
    await Estacion.create({ name: 'Múzquiz', linea: lineaB.id });
    await Estacion.create({ name: 'Río de los Remedios', linea: lineaB.id });
    await Estacion.create({ name: 'Impulsora', linea: lineaB.id });
    await Estacion.create({ name: 'Nezahualcóyotl', linea: lineaB.id });
    await Estacion.create({ name: 'Villa de Aragón', linea: lineaB.id });
    await Estacion.create({ name: 'Bosque de Aragón', linea: lineaB.id });
    await Estacion.create({ name: 'Deportivo Oceanía', linea: lineaB.id });
    await Estacion.create({ name: 'Oceanía', linea: lineaB.id });
    await Estacion.create({ name: 'Romero Rubio', linea: lineaB.id });
    await Estacion.create({ name: 'Ricardo Flores Magón', linea: lineaB.id });
    await Estacion.create({ name: 'San Lázaro', linea: lineaB.id });
    await Estacion.create({ name: 'Morelos', linea: lineaB.id });
    await Estacion.create({ name: 'Tepito', linea: lineaB.id });
    await Estacion.create({ name: 'Lagunilla', linea: lineaB.id });
    await Estacion.create({ name: 'Garibaldi-Lagunilla', linea: lineaB.id });
    await Estacion.create({ name: 'Guerrero', linea: lineaB.id });
    await Estacion.create({ name: 'Buenavista', linea: lineaB.id });
    await Estacion.create({ name: 'Tláhuac', linea: linea12.id });
    await Estacion.create({ name: 'Tlaltenco', linea: linea12.id });
    await Estacion.create({ name: 'Zapotitlán', linea: linea12.id });
    await Estacion.create({ name: 'Nopalera', linea: linea12.id });
    await Estacion.create({ name: 'Olivos', linea: linea12.id });
    await Estacion.create({ name: 'Tezonco', linea: linea12.id });
    await Estacion.create({ name: 'Periférico Oriente', linea: linea12.id });
    await Estacion.create({ name: 'Calle 11', linea: linea12.id });
    await Estacion.create({ name: 'Lomas Estrella', linea: linea12.id });
    await Estacion.create({ name: 'San Andrés Tomatlán', linea: linea12.id });
    await Estacion.create({ name: 'Culhuacán', linea: linea12.id });
    await Estacion.create({ name: 'Atlalilco', linea: linea12.id });
    await Estacion.create({ name: 'Mexicaltzingo', linea: linea12.id });
    await Estacion.create({ name: 'Ermita', linea: linea12.id });
    await Estacion.create({ name: 'Eje central', linea: linea12.id });
    await Estacion.create({ name: 'Parque de los venados', linea: linea12.id });
    await Estacion.create({ name: 'Zapata', linea: linea12.id });
    await Estacion.create({ name: 'Hospital 20 de Noviembre', linea: linea12.id });
    await Estacion.create({ name: 'Insurgentes Sur', linea: linea12.id });
    await Estacion.create({ name: 'Mixcoac', linea: linea12.id });
    await Estacion.create({ name: 'Valentín Campa', linea: linea12.id });
    await Estacion.create({ name: 'Álvaro Obregón', linea: linea12.id });
    await Estacion.create({ name: 'Observatorio', linea: linea12.id });
    console.log('Datos cargados')
  }
};

mongoose.Promise = global.Promise;

function isValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const db: any = {
  User,
  RefreshToken,
  Linea,
  Equipo,
  Estacion,
  Alerta,
  Historico,
  Actividad,
  isValidId,
};

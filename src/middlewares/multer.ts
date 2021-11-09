import multer from 'multer';
const storage = multer.memoryStorage();

export const upload = multer({ storage: storage }).any();

export const uploadSingle = multer({ storage: storage }).single('image');

export const uploadMultiple = multer({ storage: storage }).any();

export const uploadHistorico = multer({ storage: storage }).single('pdf');

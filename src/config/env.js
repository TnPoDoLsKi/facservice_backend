export const NODE_ENV = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 3000;
export const DB =
  process.env.MONGODB_URI || "mongodb+srv://facservice:facservice@cluster0.fuo82.mongodb.net/facservice?retryWrites=true&w=majority";
export const SECRET =
  process.env.SECRET || "thisisaverysecurestringtonotbeinghacked";
export const HOST =
  process.env.HOST || "http://localhost:3000"; 
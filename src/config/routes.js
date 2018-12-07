import express from "express";
const router = express.Router();

//import userRoute from "../components/user/userRoutes";
import formationRoute from "../components/formation/formationRoutes";

// import documentRoute from '../components/document/documentRoutes'
// import majorRoute from '../components/major/majorRoutes'
// import correctionRoute from '../components/correction/correctionRoutes'
// import subjectRoute from '../components/subject/subjectRoutes'

//userRoute(router);
formationRoute(router);
// documentRoute(router)
// majorRoute(router)
// correctionRoute(router)
// subjectRoute(router)

export default router;

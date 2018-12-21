import express from "express";
const router = express.Router();

//import userRoute from "../components/user/userRoutes";
import formationRoute from "../components/formation/formationRoutes";
import levelRoute from "../components/level/levelRoutes";
import sectionRoute from "../components/section/sectionRoutes";
import subjectRoute from "../components/subject/subjectRoutes";

// import documentRoute from '../components/document/documentRoutes'
// import majorRoute from '../components/major/majorRoutes'
// import correctionRoute from '../components/correction/correctionRoutes'
// import subjectRoute from '../components/subject/subjectRoutes'

//userRoute(router);
formationRoute(router);
levelRoute(router);
sectionRoute(router);
subjectRoute(router);

// documentRoute(router)
// majorRoute(router)
// correctionRoute(router)
// subjectRoute(router)

export default router;

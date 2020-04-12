import _ from "lodash";
import shell from 'shelljs'

import { Formation, Level, Major, Subject, Document, Correction } from "../../config/models";

export async function resetcollections(req, res) {
  try {

    await Correction.delete()
    await Document.delete()
    await Subject.delete()
    await Major.delete()
    await Level.delete()
    await Formation.delete()

    shell.cd(__dirname + '../../../')
    shell.exec('npm run seeds')

    return res.json({ success: true });
  } catch (err) {
    console.log(err)
    return res.status(500).end();
  }
}

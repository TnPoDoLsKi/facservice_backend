import _ from 'lodash'
import Formation from './formation'

export async function getOne(req, res) {
    try {

        if (!req.params.id)
            return res.status(400).json({
                code: 126,
                error: 'id cannot be empty'
            })

        let formation = await Formation.findById({
            _id: req.params.id
        })

        return res.json({
            formation
        })

    } catch (error) {

        console.log(error)
        return res.status(500).end()
    }
}
export async function create(req,res) {
    try {
        let formation = _.pick(req.body, 'name', 'description')

        formation = await Formation.create(formation)

        return res.json({
            formation
        })

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function update(req, res) {
    try {

       let formation = await Formation.update({ _id: req.params.id }, { $set: {  name: req.body.name,
        description: req.body.description}});

        return res.json({
            formation
        })
    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}

export async function remove(req,res) {
    try {
        let formation =await Formation.deleteOne({ _id: req.params.id });
       
        return res.json({
            formation
        })
     } catch (error) {
         console.log(error)
         return res.status(500).end()
     }
}
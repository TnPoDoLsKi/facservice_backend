import _ from 'lodash'
import Level from './level'

export async function create(req,res) {
    try {
        if (!req.body.name )
        return res.status(400).json({
            code: 126,
            error: 'name is required !'
        })

        if (!req.body.description)
        return res.status(400).json({
           code: 126,
           error: 'description is required !'
        })

        let level = _.pick(req.body, 'name', 'description')

        level = await Level.create(level)

        return res.json(
            level
        )

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function getAll(req, res) {
    try {

        let levels = await Level.find()

        return res.json(
           levels
        )

    } catch (error) {

        console.log(error)
        return res.status(500).end()
    }
}
export async function getOne(req, res) {
    try {

        if (!req.params.id)
            return res.status(400).json({
                code: 126,
                error: 'id cannot be empty'
            })

        let level = await Level.findById({
            _id: req.params.id
        })

        return res.json(
            level
        )

    } catch (error) {

        console.log(error)
        return res.status(500).end()
    }
}
export async function update(req, res) {
    try {

        if (!req.body.name )
        return res.status(400).json({
            code: 126,
            error: 'name is required !'
        })

     if (!req.body.description)
    return res.status(400).json({
        code: 126,
        error: 'description is required !'
    })
         
    let level = await Level.findOne({ _id: req.params.id})
    if (!level)
        return res.status(400).json({
            code: 126,
            error: 'level not found !'
        })

    level.description = req.body.description
    level.name = req.body.name

    await level.save()

    return res.status(200).end()

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function remove(req,res) {
    try {
        if (!req.params.id)
        return res.status(400).json({
            code: 126,
            error: 'id cannot be empty'
        })
    let level = await Level.deleteOne({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name,
            description: req.body.description
        }
    });

    return res.json(
        level
    )
     } catch (error) {
         console.log(error)
         return res.status(500).end()
     }
}
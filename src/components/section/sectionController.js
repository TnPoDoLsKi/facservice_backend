import _ from 'lodash'
import Section from './section'

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

        let section = _.pick(req.body, 'name', 'description')

        section = await Section.create(section)

        return res.json(
            section
        )

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function getAll(req, res) {
    try {

        let section = await Section.find()

        return res.json(
           section
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

        let section = await Section.findById({
            _id: req.params.id
        })

        return res.json(
            section
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
         
    let section = await Section.findOne({ _id: req.params.id})
    if (!section)
        return res.status(400).json({
            code: 126,
            error: 'section not found !'
        })

    section.description = req.body.description
    section.name = req.body.name

    await section.save()

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
    let section = await Section.deleteOne({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.name,
            description: req.body.description
        }
    });

    return res.json(
        section
    )
     } catch (error) {
         console.log(error)
         return res.status(500).end()
     }
}
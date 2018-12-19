import _ from 'lodash'
import Subject from './subject'

export async function create(req, res) {
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
        let subject = _.pick(req.body, 'name', 'description')

        subject = await Subject.create(subject)

        return res.json(
            subject
        )

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function getAll(req, res) {
    try {

        let subject = await Subject.find()

        return res.json(
            subject
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

        let subject = await Subject.findById({
            _id: req.params.id
        })

        return res.json(
            subject
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
             
        let subject = await Subject.findOne({ _id: req.params.id})
        if (!subject)
            return res.status(400).json({
                code: 126,
                error: 'subject not found !'
            })

        subject.description = req.body.description
        subject.name = req.body.name

        await subject.save()

        return res.status(200).end()

    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
export async function remove(req, res) {
    try {

        if (!req.params.id)
            return res.status(400).json({
                code: 126,
                error: 'id cannot be empty'
            })
        let subject = await Subject.deleteOne({
            _id: req.params.id
        }, {
            $set: {
                name: req.body.name,
                description: req.body.description
            }
        });

        return res.json(
            subject
        )
    } catch (error) {
        console.log(error)
        return res.status(500).end()
    }
}
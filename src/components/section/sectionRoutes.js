import { create ,getOne ,update ,remove , getAll} from './sectionController'

export default function (router) {
    router.get('/section', getAll)
    router.get('/section/:id', getOne)
    router.post('/section', create)
    router.put('/section/:id', update)
    router.delete('/section/:id', remove)
}
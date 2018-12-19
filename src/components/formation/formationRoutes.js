import { getOne , create ,update ,remove , getAll} from './formationController'

export default function (router) {
    router.get('/formation', getAll)
    router.get('/formation/:id', getOne)
    router.post('/formation', create)
    router.put('/formation/:id', update)
    router.delete('/formation/:id', remove)
}
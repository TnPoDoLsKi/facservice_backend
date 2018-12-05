import {
    User,
    Major
} from '../../config/models'
import _ from 'lodash'
import atob from 'atob'
import { SECRET } from '../../config/env'
import jwt from 'jsonwebtoken'

export async function createUser(req, res) {
    try{
        let user = _.pick(req.body, 'email', 'hashedPassword', 'type', 'firstName', 'lastName', 'avatar');

        await User.findOne( { email: user.email }, function (err, user) {
            if (err) {
                return res.status(500).end()
            }
            else if (user) {
                return res.status(208).end()
            }
        });
        await Major.findOne({ desc: req.body.major }, function(err, foundMajor){
            if (err){
                return res.status(400).end()
            }
            else{
                user.major = foundMajor;
            }
        });

        await User.create(user);

        return res.status(201).end()

    } catch(err) {
        res.status(500).end()
    }
}

export async function getByType(req, res) {
    try {
        if(!req.params.type || req.params.type !== 'prof' && req.params.type !== 'student'){
            return res.status(400).end();
        }

        let users = await User.find({ type: req.params.type }).populate('major').exec();

        return res.status(200).json(
            users
        );

    } catch(err) {
        return res.status(500).end()
    }
}

export function isAdmin(req, res, next) {
    try{
        if('authorization' in req.headers) {
            let bearer = req.headers['authorization'];

            let token = bearer.split(' ')[1];

            if (!token) {
                return res.status(403).send({
                    auth: false,
                    message: 'No token provided'
                })
            }
            else {

                let base64Url = token.split('.')[1];

                let base64 = base64Url.replace('-', '+').replace('_', '/');

                let payload = JSON.parse(atob(base64));

                if(payload.type === 'admin'){
                    next();
                } else {
                    res.status(403).end()
                }
            }
        } else {
            res.status(401).end()
        }
    } catch (error){
        res.status(500).end()
    }
}

export async function updateUser(req, res) {
    try {
        if (!req.params.id){
            return res.status(400).end();
        }

        let user = _.pick(req.body, 'email', 'hashedPassword', 'type', 'firstName', 'lastName', 'avatar');

        if(req.body.major){
            await Major.findOne({ desc: req.body.major }, function(err, foundMajor){
                if (err){
                    return res.status(400).end()
                }
                else{
                    user.major = foundMajor._id
                }
            });
        }

        user = await User.update({ _id: req.params.id }, {$set: user});

        return res.status(200).end();

    } catch (error) {
        console.log(error);
        return res.status(500).end()
    }
}

export async function deleteUser(req, res) {
    try {
        if (!req.params.id)
            return res.status(400).end();

        await User.remove({ _id: req.params.id });

        return res.status(204).end()

    } catch (error) {
        return res.status(500).end()
    }
}

export async function signIn(req, res) {
    try{
        await User.findOne( { email: req.body.email }, function (err, user) {
            if(!user) {
                return res.status(400).end()
            }
            user.comparePassword(req.body.hashedPassword, function (err, equal) {
                if(equal && !err){
                    let token = jwt.sign(user.toJSON(), SECRET, {expiresIn: 250000});
                    res.json({"JWT": token})
                }
                else{
                    return res.status(400).end()
                }
            })
        })
    } catch (err) {
        return res.status(500).end()
    }

}

export async function signOut(req, res) {

}
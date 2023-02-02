import { Request, Response } from "express";
import User from "../models/userModel";

export const getUsers = async (req: Request, res: Response) => {

    const users = await User.findAll();

    res.json(users);

}

export const getUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const user = await User.findByPk(id);

    if ( !user ) {
        return res.status(404).json({
            msg: "The user you're looking for, doesn't exists",
            status: false
        })
    }

    res.json(user);

}

export const postUser = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const existsUser = await User.findOne({
            where: {
                email: body.email
            }
        });

        if ( existsUser ) {
            return res.status(400).json({
                status: false,
                msg: "Email already exists"
            })
        }

        const user = User.build(body);
        user.save();

        res.json({
            status: true,
            user
        })

    } catch (error) {
        
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })

    }


}

export const putUser = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const [ existsUser , existsEmail ] = await Promise.all([
            await User.findByPk( id ),
            await User.findOne({
                where: {
                    email: body.email
                }
            })
        ])

        if ( !existsUser ) {
            return res.status(400).json({
                status: false,
                msg: `User with ID ${id}, doesn't exists`
            })
        }

        if ( existsEmail ) {
            return res.status(400).json({
                status: false,
                msg: `The email ${body.email } alread exists`
            })
        }

        await existsUser.update( body );

        res.json({
            status: true,
            existsUser
        });

    } catch (error) {
        
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })

    }

}

export const deleteUser = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const user = await User.findByPk( id );
        if ( !user ) {
            return res.status(400).json({
                status: false,
                msg: `User with ID ${id}, doesn't exists`
            })
        }
        //await user.destroy(); // full removal

        await user.update({ status: false }) // logical removal
        
    } catch (error) {
        
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })

    }

}

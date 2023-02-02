import { DataTypes } from "sequelize";
import db from "../db/connection";

const User = db.define('users', {

    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },

});

export default User;

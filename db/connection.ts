import { Sequelize } from "sequelize";

const db = new Sequelize('curso-node', 'postgres', 'Desarrollo1*', {
    host: 'localhost',
    dialect: 'postgres',
    // logging: false
});

export default db;
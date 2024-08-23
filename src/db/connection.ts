import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rrhh', 'root', 'admin1234', {
    host: "localhost",
    dialect: 'mysql'
})

export default sequelize
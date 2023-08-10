import { DataSource } from "typeorm";
import { Task } from "../domain/Task"; 
import dotenv from "dotenv";

dotenv.config(); 

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Task], 
  subscribers: [],
  migrations: [Task], 
});

AppDataSource.initialize()
  .then(() => {
    console.log("Conexión con la base de datos establecida");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

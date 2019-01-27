import { createConnection } from "typeorm";
import { User } from "./backend/entities/User";
import { Link } from "./backend/entities/Link";
import { Comment } from "./backend/entities/Comment";
import { Vote } from "./backend/entities/Vote";


export async function createDbConnection() {

    // Read the database settings from the environment vairables
    const DATABASE_HOST = process.env.DATABASE_HOST;
    const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
    const DATABASE_USER = process.env.DATABASE_USER;
    const DATABASE_DB = 'demo2';//process.env.DATABASE_DB; //TODO - change

    // Display the settings in the console so we can see if something is wrong
    console.log(
        `
            host: ${DATABASE_HOST}
            password: ${DATABASE_PASSWORD}
            user: ${DATABASE_USER}
            db: ${DATABASE_DB}
        `
    );

    // Open database connection
    await createConnection({
        type: "postgres",
        host: DATABASE_HOST,
        port: 5432,
        username: DATABASE_USER,
        password: DATABASE_PASSWORD,
        database: DATABASE_DB,
        // If you forget to add your entities here you will get a "repository not found" error
        entities: [
            User,
            Link,
            Comment,
            Vote
        ],
        // This setting will automatically create database tables in the database server
        synchronize: true
    });

}

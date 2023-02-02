import express, { Application } from 'express';
import userRoutes from '../routes/userRoutes';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: string;

    private apiPaths = {
        user: "/api/user"
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '8000';

        // Initial Methods
        this.dbConnection();
        this.middlewares();
        this.routes();

    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Database online');

            
        } catch (error) {

            throw new Error( error as string );
            
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Body reader
        this.app.use( express.json() );

        // Public Folder
        this.app.use( express.static('public') );
    }

    routes() {

        this.app.use( this.apiPaths.user, userRoutes );

    }

    listen() {

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })

    }

}

export default Server;
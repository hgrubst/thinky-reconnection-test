import { Server } from "hapi";
import { User, listenToUserChanges } from './User'
import thinky from './thinky';

async function init() {
    const server = new Server({ port: 9000 });

    server.route({
        path: '/user',
        method: 'GET',
        handler: async (request) => {
            let users = User.run();
            return users;
        }
    })

    await server.start();
    console.log('Server started on port', server.info.port);

    listenToUserChanges();


}

init();


//connect to a db with listeners




//close the db and check that the db connection comes back when db is back
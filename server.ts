import { Server } from "hapi";
import { User } from './User'
import thinky from './thinky';

async function init() {
    const server = new Server({port : 9000});

    server.route({
        path : '/user', 
        method : 'GET',
        handler : async (request)=>{
            let users = User.run();
            return users;
        }
    })

    await server.start();
    console.log('Server started on port', server.info.port);

    User.changes().then(function (feed) {
        feed.each(function (error, doc) {
            if (error) {
                console.log("Error while processing changefeed", error);
            }

            if (doc.isSaved() === false) {
                console.log("The following document was deleted:");
                console.log(doc);
            }
            else if (doc.getOldValue() == null) {
                console.log("A new document was inserted:");
                console.log((doc));
            }
            else {
                console.log("A document was updated.");
                console.log("Old value:");
                console.log((doc.getOldValue()));
                console.log("New value:");
                console.log((doc));
            }
        });
    }).error(function (error) {
        console.log("Error while connecting to changefeed", error);
        // process.exit(1);
    });

}

init();


//connect to a db with listeners




//close the db and check that the db connection comes back when db is back
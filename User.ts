import thinky from './thinky';

export const User = thinky.createModel('User', {
    firstName: String,
    lastName: String
})


export function listenToUserChanges() {
    return User.changes().then(function (feed) {
        console.log('Connected to change feeds');
        feed.each(function (error, doc) {
            if (error) {
                console.log("Error while processing changefeed", error);
                reconnect();
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
        reconnect();
    });
}

function reconnect() {
    setTimeout(function () {
        console.log('Trying to reconnect to db')
        listenToUserChanges();
    }, 5000)
}
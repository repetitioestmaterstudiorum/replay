# replay

Adding replayability (in the spirit of immutability) to MongoDB.

## Strategy

-   create a custom collection class with custom CRUD methods
-   add a history property (array) per DB document on insert
-   update methods will update actual document and save update operations in history array
-   save the initial document in the history as well, as first element
-   save changes in the form of update operations that are passed to MongoDB's update methods (not absolute values)
-   keep track of time (timestamp), and perhaps other metadata
-   use the MongoDB Node.js driver package: https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/ (and the Meteor mongo package? -> perhaps a solution that works with either)
-   soft deletion (no actual removing of documents)
-   find methods will get the current document by default (no read efficiency loss)
-   find methods accept a time parameter which compute the document's state at that moment in time

## Core challenge

The core challenge of this strategy is to be able to compute the documents' states at any given time. Logic is required that takes the initial document state and applies all update operations until a given timestamp.

Possible operations are

-   Field Update Operators https://www.mongodb.com/docs/manual/reference/operator/update-field/
-   Array Update Operators https://www.mongodb.com/docs/manual/reference/operator/update-array/
-   Bitwise Update Operator https://www.mongodb.com/docs/manual/reference/operator/update-bitwise/

Given an initial object, logic is needed capable of applying MongoDB update operator style modifications. Essentially, the reverse of this package: https://www.npmjs.com/package/mongo-dot-notation. Something like https://www.npmjs.com/package/manip or https://www.npmjs.com/package/obop. Manip seems to be closest to what is needed, and decided to focus on the four likely most frequenly used operations $set, $unset, $push and $inc.

Implementing core update operations (or using a package) is an option, but requires maintenance, is error prone, and reduces the functionality (only works with implemented update operations).

### Solution

A simpler solution that is very robust and requires little to no maintenance is to use https://www.npmjs.com/package/mongodb-memory-server and create an in-momory server to apply modifications. A lookup procedure with timestamp then looks like this:

-   the custom find method gets all elements from the history that have a timestamp lower than the parameter's timestamp
-   the initial document is inserted into the in-memory db
-   all modifications are applied (in timestamp order)
-   the final document is read from memory, the projection is applied, and the result returned
-   the document is deleted either right away or using a time index

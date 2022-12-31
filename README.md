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

-   the custom find method gets all elements from the history that have a timestamp earlier than the parameter's timestamp
-   the initial document is inserted into the in-memory db (this could be one or several documents)
-   all modifications are applied (in timestamp order, to one or several documents)
-   the final document(s) is/are read from memory, the projection is applied, and the result returned
-   the document is deleted either right away or using a time index -> TBD

## Leanings

### meteor-relay package

-   removed this package and its dependencies for a few reasons: the "one file per method" issue,because I want to use Meteor as natively as possible to ensure compatibility with the future big change from Fibers to Promises, because I don't want to adhere an additional folder structure imposed (in addition to what Meteor already imposes with server and client)
-   https://github.com/zodern/meteor-relay
-   one file per method is required, otherwise there will be "{the imported function} is already declared" error when importing the same code, e.g. auth stuff like checkLoggedIn(), in several methods in the same file
-   the meteor methods need to be in a `/methods` directory to ensure methods are rewritten in the client bundle
-   `stub: true` will enable the method on the client as well
-   `stub() {}` can replace the server side method on the client with something simpler
-   sample publications with varying complexity: https://github.com/zodern/meteor-relay/blob/master/tests/publications/index.js

### replayability and pub-sub

-   the issue with this approach is that I need a different name for replay collections where I generate the state of documents at timestamp X in memory. When I then wanted this data in Minimongo, I needed the same collection name as on the client. This required a switch from the base collection name to the replay collection on the client. That's not only not nice, but it also led to timing issues, and to a duplicate \_id problem in Minimongo (same document in two collections). Also, Minimongo just suddenly "forgets" one collection (due to the name switch in the component). Sometimes (really, not always), the server then wrote to the physical db instead of the in-memory db, which I think it a bug (that I do not want to debug). Another way to solve this would have been the subscription to both collection names at all times. I did not follow this thread
-   therefore, I use methods for data from collections that are replayable. Then, data is prepared on the server, and the client is agnostic which collection the data came from

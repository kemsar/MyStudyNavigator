
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db.sqlite');

/**
 * Function to check if db is empty
 * @param results The rows from db.all(...)
 * @returns {boolean}
 * @constructor
 */
function DbIsEmpty( results )
{
  console.log("Checking results: " + results);
  if(results==undefined) return true;
  var len = results.length;
  console.log( len );
  return len == 0;
}

/**
 * Populates a new database with default values
 * @constructor
 */
function PopulateDB()
{
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, password TEXT)");
    db.run("INSERT INTO users VALUES ('admin', 'Kevin Sarsen', 'kevinsarsen@gmail.com', 'admin')");
    // var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");
    // for (var i = 0; i < 10; i++) {
    //   stmt.run("Ipsum " + i);
    // }
    // stmt.finalize();
    //
    // db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    //   console.log(row.id + ": " + row.info);
    // });
  });
}

// Check to see if the database exists
db.all("SELECT * FROM users WHERE id = 'admin';", [], function(err,rows){
  if(err || DbIsEmpty( rows )){
    console.log(err);
  // }
  //
  // if( DbIsEmpty( rows ) )
  // {
    PopulateDB();
  } else {
    console.log("DB is not empty. Skipping populate.");
  }
  db.close()
});
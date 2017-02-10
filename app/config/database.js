
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('studyplanner.sqlite');

function DbIsEmpty( results )
{
  var len = results.length;
  console.log( len );
  return len == 0;
}

function InitDB( results )
{

}

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

db.all("SELECT * FROM users WHERE id = 'admin';", [], function(err,rows){
  if( DbIsEmpty( rows ) )
  {
    PopulateDB();
  }
});

db.close();
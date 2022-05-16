module.exports = { now, log } 

////////////////////////////////////////////////////////
//
// ZUTILs
//

let seasonTimeCorrection = +1

function now() {
  let date = new Date();
  return (
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth()+1)).slice(-2) + //BUG? Months start at 0
    " " +
    ("0" + (date.getHours()+seasonTimeCorrection)).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2) +
    "." +
    ("000" + date.getMilliseconds()).slice(-3)
  );
}


function log(string) {
 console.log(now())
 console.log(" " + string)
}


const cmd = require("node-cmd");

//dynamic data dump db server to local
exports.mongodbDump = async ({ body = {} }) => {
  try {
    const { dumpDbUri, dumpDbName } = body;
    const dumpdb = cmd.runSync(
      `cd  ${process.env.MONGODUMP_PATH} && .\\mongodump --db=${dumpDbName} --uri ${dumpDbUri}`
    );
    if (dumpdb.err !== null && dumpdb.stderr !== null) {
      return {
        message: "mongodump Failed..! invalid path or invalid command...!",
        status: false,
      };
    } else {
      return {
        message: "Mongodump Successfully Completed ..!",
        status: true,
      };
    }
  } catch (err) {
    console.log(err);
  }
};

//dynamic data restore db server to local
exports.mongodbRestore = async ({ body = {} }) => {
  const { restoreDbUri, restoreDbName } = body;
  const restoredb = cmd.runSync(
    `cd ${process.env.MONGORESTORE_PATH}  && .\\mongorestore --uri ${restoreDbUri}  --db=${restoreDbName} ${process.env.MONGODUMP_EXISTING_PATH} `
  );
  if (restoredb.err !== null && restoredb.stderr !== null) {
    return {
      message: "mongorestore Failed..! invalid path or invalid command...!",
      status: false,
    };
  } else {
    return {
      message: "Mongorestore Successfully Completed ..!",
      status: true,
    };
  }
};

//mongodb dump and restore server to local

// exports.dumpDbDatabase = async () => {
//   try {
//     //dump mongodb database server to local file
//     const dumpdb = cmd.runSync(
//       `cd  ${process.env.MONGODUMP_PATH} && .\\mongodump --db=${process.env.MONGODUMP_DB_NAME} --uri ${process.env.MONGODB_URI}`
//     );

//     //restore mongodb database local file to local db
//     const restoredb = cmd.runSync(
//       `cd ${process.env.MONGORESTORE_PATH}  && .\\mongorestore --uri ${process.env.MONGORESTORE_URI}  --db=${process.env.MONGORESTORE_DB_NAME} ${process.env.MONGODUMP_EXISTING_PATH} `
//     );

//     if (dumpdb.err !== null && dumpdb.stderr !== null) {
//       return {
//         message: "mongodump Failed..! invalid path or invalid command...!",
//         status: false,
//       };
//     } else if (restoredb.err !== null && restoredb.stderr !== null) {
//       return {
//         message: "mongorestore Failed..! invalid path or invalid command...!",
//         status: false,
//       };
//     } else {
//       return {
//         message: "Mongodump and Mongorestore Successfully Completed ..!",
//         status: true,
//       };
//     }
//   } catch (err) {
//     console.log(err);
//     return { message: err.message, status: false };
//   }
// };

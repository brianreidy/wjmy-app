const writeData = (riderDB, doc, data) => {
  // write data in as a dictionary
  riderDB.set({doc: data});
  console.log("writing this to db: ")
  console.log(data)
};
export default writeData;

const writeData = (riderDB, doc, data) => {
  // write data in as a dictionary
  riderDB.set({doc: data});
};
export default writeData;

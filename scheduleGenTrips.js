const db = connect('mongodb://localhost/camboparcel');

const d = new Date();
const dom = d.getDate();
const dow = d.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

db.mastertrips.find().forEach(doc => {
  checkOption(doc.option, doc);
});

// db.trips.remove({});

function checkOption (option, doc) {
  insertDoc(option === "Everyday", doc);
  insertDoc(option === dom.toString(), doc);
  insertDoc(option === days[dow], doc);
};

function insertDoc (b, doc) {
  delete doc._id;
  delete doc.option;
  delete doc.created;
  // if(b) db.trips.update({ _id: doc._id }, doc, { upsert: true });
  if(b) db.trips.insert(doc);
}
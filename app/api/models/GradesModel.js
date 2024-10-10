const mongoose = require("mongoose");
const gradesSchema = new mongoose.Schema({
  grade: String,
  tables: {
    studyTable: {
      type: Object,
    },
    examsTable: {
      type: Object,
    },
  },
});

module.exports =
  mongoose.models.grades || mongoose.model("grades", gradesSchema);

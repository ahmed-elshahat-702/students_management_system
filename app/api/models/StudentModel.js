const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  fullName: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  PlaceOfBirth: {
    type: String,
    required: true,
  },
  nationalID: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  placeOfRelease: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  fax: {
    type: String,
  },
  mailBox: {
    type: String,
  },
  systemMail: {
    type: String,
    required: true,
  },
  school: {
    type: String,
  },
  qualification: {
    type: String,
  },
  graduationYear: {
    type: String,
  },
  theRoleOfTheQualification: {
    type: String,
  },
  totalScores: {
    type: String,
    required: true,
  },
  ratio: {
    type: String,
  },
  sittingString: {
    type: String,
  },
  coordinationApprovalString: {
    type: String,
  },
  coordinationApprovalDate: {
    type: String,
  },
  thePartyFromWhichItIsTransferred: {
    type: String,
  },
  yearOfEnrollment: {
    type: String,
  },
  desires: {
    type: String,
  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianJob: {
    type: String,
  },
  guardianCity: {
    type: String,
  },
  guardianAddress: {
    type: String,
  },
  homeTelephone: {
    type: String,
  },
  guardianMobile: {
    type: String,
    required: true,
  },
  guardianEmail: {
    type: String,
  },
});

module.exports =
  mongoose.models.student || mongoose.model("student", studentSchema);

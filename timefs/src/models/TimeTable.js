// src/models/TimeTable.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    day: String,
    startTime: String,
    endTime: String
});

const timeTableSchema = new mongoose.Schema({
    subject: String,
    faculty: String,
    schedule: [scheduleSchema]
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);
export default TimeTable;
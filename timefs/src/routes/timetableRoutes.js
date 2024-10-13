// src/routes/timetableRoutes.js
import express from 'express';
import TimeTable from '../models/TimeTable.js';

const router = express.Router();

// Create a new timetable entry
router.post('/', async (req, res) => {
    try {
        const newEntry = new TimeTable(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all timetable entries
router.get('/', async (req, res) => {
    try {
        const timetable = await TimeTable.find();
        res.json(timetable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a timetable entry by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await TimeTable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a timetable entry by ID
router.delete('/:id', async (req, res) => {
    try {
        await TimeTable.findByIdAndDelete(req.params.id);
        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {router};
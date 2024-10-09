import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TimetableList = () => {
    const [timetables, setTimetables] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/timetables`)
            .then(response => setTimetables(response.data))
            .catch(error => console.error('Error fetching timetables:', error));
    }, []);

    return (
        <div>
            <h1>Timetable</h1>
            {timetables.map(timetable => (
                <div key={timetable._id} className="timetable-item">
                    <h3>{timetable.course} - {timetable.teacher}</h3>
                    <p>{timetable.dayOfWeek}, {timetable.startTime} - {timetable.endTime}</p>
                </div>
            ))}
        </div>
    );
};

export default TimetableList;

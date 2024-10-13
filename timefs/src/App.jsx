// src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [subject, setSubject] = useState('');
    const [faculty, setFaculty] = useState('');
    const [day, setDay] = useState('Monday');
    const [startTime, setStartTime] = useState('08:00');
    const [endTime, setEndTime] = useState('09:00');
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        // Fetch data from the server when the component mounts
        axios.get('http://localhost:5000/timetable')
            .then((response) => setTimetable(response.data))
            .catch((error) => console.error('Error fetching timetable:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEntry = {
            subject,
            faculty,
            schedule: [{ day, startTime, endTime }]
        };

        axios.post('http://localhost:5000/timetable', newEntry)
            .then((response) => {
                setTimetable((prev) => [...prev, response.data]);
                setSubject('');
                setFaculty('');
                setDay('Monday');
                setStartTime('08:00');
                setEndTime('09:00');
            })
            .catch((error) => console.error('Error adding timetable entry:', error));
    };

    // Render a time slot based on day and time
    const renderTimeSlot = (day, time) => {
        const entry = timetable.find((entry) =>
            entry.schedule.some(
                (slot) => slot.day === day && slot.startTime === time
            )
        );
        return entry ? `${entry.subject} (${entry.faculty})` : '';
    };

    return (
        <div className="App">
            <h1>Timetable Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Subject"
                    required
                />
                <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Faculty"
                    required
                />
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((d) => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                />
                <button type="submit">Add Class</button>
            </form>

            <table border="1">
                <thead>
                    <tr>
                        <th>Time</th>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'].map((time) => (
                        <tr key={time}>
                            <td>{time}</td>
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                                <td key={day}>{renderTimeSlot(day, time)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;

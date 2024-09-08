import React, { useState } from 'react';

const StudentForm = () => {
    const [student, setStudent] = useState({
        eid: '',
        ename: '',
        esal: '',
        edesg: '',
        a: {
            aid: '',
            anum: '',
            aloc: ''
        }
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleAadharChange = (e) => {
        const { name, value } = e.target;
        setStudent(prevStudent => ({
            ...prevStudent,
            a: { ...prevStudent.a, [name]: value }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8080/Con1/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Student created:', data);
                setSuccess('Student created successfully!');
                setError('');
                // Reset form after successful submission
                setStudent({
                    eid: '',
                    ename: '',
                    esal: '',
                    edesg: '',
                    a: { aid: '', anum: '', aloc: '' }
                });
            })
            .catch(error => {
                console.error('Error during student creation:', error);
                setError('Failed to create student. Please try again.');
                setSuccess('');
            });
    };

    return (
 
        <form onSubmit={handleSubmit}>
            <input type="text" name="eid" placeholder="EID" value={student.eid} onChange={handleChange} required />
            <input type="text" name="ename" placeholder="Name" value={student.ename} onChange={handleChange} required />
            <input type="number" name="esal" placeholder="Salary" value={student.esal} onChange={handleChange} required />
            <input type="text" name="edesg" placeholder="Designation" value={student.edesg} onChange={handleChange} required />
            
            <h3>Aadhar Details</h3>
            <input type="text" name="aid" placeholder="AID" value={student.a.aid} onChange={handleAadharChange} required />
            <input type="text" name="anum" placeholder="Aadhar Number" value={student.a.anum} onChange={handleAadharChange} required />
            <input type="text" name="aloc" placeholder="Location" value={student.a.aloc} onChange={handleAadharChange} required />

            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}

            <button type="submit">Create Student</button>
        </form>
    );
};

export default StudentForm;

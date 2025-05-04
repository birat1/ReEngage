import { useState, useEffect } from 'react';
import axios from 'axios';

const ChildRegister = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstname: '',
        surname: '',
        year: '',
        managed_by: '',
        english_answered: 0,
        english_correct: 0,
        maths_answered: 0,
        maths_correct: 0,
        science_answered: 0,
        science_correct: 0,
        level: 0,
        points: 0,
        streak: 0,
        xp: 0,
    });

    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/admins') // Replace 'backend' with your service name in docker-compose.yml
            .then(response => setAdmins(response.data))
            .catch(error => console.error('Failed to fetch admins:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Selected Admin ID:", formData.managed_by);
    
        // Build the user object to match the backend structure
        const userData = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
        };
    
        const studentData = {
            user: userData,
            firstname: formData.firstname,
            surname: formData.surname,
            year: formData.year,
            managed_by: formData.managed_by,
            english_answered: formData.english_answered,
            english_correct: formData.english_correct,
            maths_answered: formData.maths_answered,
            maths_correct: formData.maths_correct,
            science_answered: formData.science_answered,
            science_correct: formData.science_correct,
            level: formData.level,
            points: formData.points,
            streak: formData.streak,
            xp: formData.xp,
        };
    
        // Sends the entire student data to the backend API
        axios.post('http://localhost:8000/api/students/', studentData)
            .then(response => {
                alert('Child Registered Successfully!');
            })
            .catch(error => {
                console.error('Error registering student:', error.response?.data || error.message);
            });
    };
    

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Register Child</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="fn"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="surname">Surname:</label>
                    <input
                        type="text"
                        id="sn"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="un"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="pw"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="year">Year:</label>
                    <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select a year</option>
                        {[3, 4, 5, 6].map((y) => (
                            <option key={y} value={y}>Year {y}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="managed_by">Managed By (Admin):</label>
                    <select
                        id="managed_by"
                        name="managed_by"
                        value={formData.managed_by}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    >
                        <option value="">Select an admin</option> 
                        {admins.map((admin) => (
                            <option key={admin.id} value={admin.id}>
                                {admin.username || `${admin.firstname} ${admin.surname}`}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default ChildRegister;
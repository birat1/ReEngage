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
        managed_by: ''
    });

    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/admins') // Replace 'backend' with your service name in docker-compose.yml
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
        console.log('Child Registered:', formData);
        // Add logic to send formData to your backend or API
        setFormData({ name: '', age: '', email: '' });
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
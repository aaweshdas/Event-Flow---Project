import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';
import { Users, Search, Filter } from 'lucide-react';
import Button from '../ui/Button';

const StudentsTab = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await api.getStudents();
                setStudents(data);
            } catch (error) {
                console.error("Failed to fetch students", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <motion.div key="admin-students" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="section-head" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2><Users size={20} /> Registered Students</h2>
            </div>

            <div className="admin-table-wrap glass-panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or department..."
                            className="settings-input"
                            style={{ paddingLeft: '2.5rem' }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline"><Filter size={16} /> Filter</Button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>Loading students...</div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Batch</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td style={{ fontWeight: '500' }}>{student.name}</td>
                                    <td style={{ color: 'var(--text-secondary)' }}>{student.email}</td>
                                    <td>{student.department}</td>
                                    <td>{student.enrollmentYear}</td>
                                    <td>
                                        <span className={student.status === 'Active' ? 'badge-confirmed' : 'badge-inactive'}>
                                            {student.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No students found matching your search.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </motion.div>
    );
};

export default StudentsTab;

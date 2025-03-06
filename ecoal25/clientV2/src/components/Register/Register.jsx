import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Register.module.css';
import logo from '../../assets/logo/Logo.png';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong!');
            }
            navigate('/login');
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className={styles.div1}>
            <div className={`${styles.corner} ${styles["top-left"]}`}></div>
            <div className={`${styles.corner} ${styles["bottom-right"]}`}></div>


            <img src={logo} className={styles.image} alt="Logo" />
            <br />
            <h1>Create Account</h1>

            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name='name'
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* <div className={styles.inputGroup}>
                    <input 
                        type="number" 
                        placeholder="Phone Number" />
                </div> */}

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name='email'
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        name='password'
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    className={styles.loginbtn}
                    type='submit'
                    disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>
        </div>
    );
}

export default Register;
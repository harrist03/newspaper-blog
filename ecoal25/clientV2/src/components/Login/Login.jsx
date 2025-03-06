import { useState } from 'react';
import { useNavigate } from 'react-router';
import './Login.css';
import logo from '../../assets/logo/Logo.png';

function Login() {
    const [formData, setFormData] = useState({
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
            const response = await fetch('http://localhost:8000/api/login', {
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
            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <div className="login-container">
                <div className="arrow" onClick={() => navigate(-1)}>
                    <box-icon name='left-arrow-alt' size="lg"></box-icon>
                </div>
                {/* Corner */}
                <div className="corner top-left"></div>
                <div className="corner bottom-right"></div>

                <div>
                    {/* Logo */}
                    <div>
                        <img src={logo} className='image'></img>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {/* Inputs */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="email"
                                name='email'
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <p className="create-account">Don't have an account? <a href="/register">Register</a></p>

                        <button
                            className="login-btn"
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
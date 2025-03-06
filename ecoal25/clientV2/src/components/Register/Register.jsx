import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../Login/Login.css';  // Use the same CSS file as Login
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
                        <img src={logo} className='image' alt="Logo" />
                    </div>
                    
                    {error && <p className="error-message">{error}</p>}
                    
                    {/* Inputs */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                name='name'
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
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
                        
                        <p className="create-account">Already have an account? <a href="/login">Login</a></p>

                        <button
                            className="login-btn"  // Reusing the login button style
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Register;
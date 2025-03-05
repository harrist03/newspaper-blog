import './Login.css';
import logo from '../../assets/logo/Logo.png';

function Login() {
    return (
        <>
            <div className="login-container">
                {/* Corner */}
                <div className="corner top-left"></div>
                <div className="corner bottom-right"></div>

                <div>
                    {/* Logo */}
                    <div>
                        <img src={logo} className='image'></img>
                    </div>

                    {/* Inputs */}
                    <form>
                        <div className="input-group">
                            <input type="email" placeholder="Email" />
                        </div>

                        <div className="input-group">
                            <input type="password" placeholder="Password" />
                        </div>

                        <p className="create-account">Create Account</p>

                        <button className="login-btn">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
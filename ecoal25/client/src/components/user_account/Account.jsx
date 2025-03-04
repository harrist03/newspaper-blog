import './Login.css';
import logo from '../../assets/logo/Logo.png';

function Account() {
    return (
        <>
            {/* Border */}
            <div className="corner top-left"></div>
            <div className="corner bottom-right"></div>

            <div>
                <div>
                    <img src={logo} className='image'></img>
                </div>
                <br />
                <form>
                   
                    <p className="create-account">Create Account</p>

                    <button className="login-btn">Login</button>
                </form>
            </div>
        </>
    )
}

export default Account

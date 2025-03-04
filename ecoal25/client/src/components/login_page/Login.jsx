import './Login.css';
import logo from '../../assets/logo/Logo.png';

function Login() {
    return (
        <>
            <div className="login">
                <div>
                    <img src={logo} className='image'></img>
                </div>
                <br/>
                <form>
                    <input name="query" placeholder="Name"/>
                    <br/>
                    <input name="query" placeholder="Password" />
                    <br/>
                    <button type="submit" className="button" >Login</button>
                </form>
            </div>
       </>
    )
}

export default Login

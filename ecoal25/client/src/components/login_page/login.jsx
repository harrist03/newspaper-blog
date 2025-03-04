import './login.css';
 
function Login() {
    return (
        <>
            <div>
                <div>            
                    <img src='../src/assets/logo/Logo.png' className='image'></img>
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
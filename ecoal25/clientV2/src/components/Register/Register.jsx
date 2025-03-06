import styles from './Register.module.css';
import logo from '../../assets/logo/Logo.png';

function Register() {
    return (
        <div className={styles.div1}>
            {/* Bordas */}
            <div className={`${styles.corner} ${styles["top-left"]}`}></div>
            <div className={`${styles.corner} ${styles["bottom-right"]}`}></div>


            <img src={logo} className={styles.image} alt="Logo" />
            <br />
            <h1>Create Account</h1>
            <form>
                <div className={styles.inputGroup}>
                    <input type="text" placeholder="Name" />
                </div>

                <div className={styles.inputGroup}>
                    <input type="number" placeholder="Phone Number" />
                </div>

                <div className={styles.inputGroup}>
                    <input type="email" placeholder="Email" />
                </div>

                <div className={styles.inputGroup}>
                    <input type="password" placeholder="Password" />
                </div>

                <button className={styles.loginbtn}>Create Account</button>
            </form>
        </div>
    );
}

export default Register;

import React from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useHistory, useLocation } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
import { UserContext } from '../../App';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [user, setUser] = React.useContext(UserContext);
    const [admin, setAdmin] = React.useState(null)
    const [error, setError] = React.useState(null)
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    document.title = 'Login||Creative Agency'

    React.useEffect(() => {
        fetch('https://pacific-depths-60044.herokuapp.com/admins')
            .then(res => res.json())
            .then(data => setAdmin(data));

    }, [user])

    const handleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL, uid } = result.user;
                let isAdmin = admin.filter(ad => ad.email === email);
                if (isAdmin.length > 0) {
                    isAdmin = true;
                }
                else {
                    isAdmin = false;
                }
                setUser({ ...user, name: displayName, email, uid, photoURL, isAdmin });
                setError(false);
                history.replace(from)
            })
            .catch(error => {
                if (error) {
                    setError('Something went wrong... Please try again or Reload the page and try again')
                }
            });
    }
    return (
        <div className="login-page d-flex justify-content-center align-items-center">
            <div className="login-container d-flex flex-column align-items-center">
                <Link to="/home"> <img className="mb-5" height="47px" src={logo} alt="logo" /></Link>
                <div className="login-box">
                    <div className="login-info d-flex flex-column align-items-center">
                        <h3 className="mb-4">Login With</h3>
                        <button onClick={handleLogin} className="mb-3"><FontAwesomeIcon icon={faGoogle} /> Login With Google</button>
                        <p>Don't have an Account? <Link to='/login'>Create a new account</Link></p>
                        {
                            error ?
                                <p className="font-weight-bold text-center text-danger">
                                    <FontAwesomeIcon icon={faTimesCircle} /> Something Wrong happened... Please try again <br />
                                    and if this happens frequently reload the page...
                                </p>
                                :
                                null
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
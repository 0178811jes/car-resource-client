import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const GoogleLogin = () => {

    const {gooleLogin} = useContext(AuthContext);

    const googleProvider = new GoogleAuthProvider();

    const handleLogin = ()=>{
        gooleLogin(googleProvider)
        .then(result =>{
            const user = result.user;
            console.log(user);
        })
        .catch(err => console.error(err));
    }

    return (
        <div>
            <button onClick={handleLogin}><li className="font-semibold"><Link to='/'>Google</Link></li></button>
        </div>
    );
};

export default GoogleLogin;
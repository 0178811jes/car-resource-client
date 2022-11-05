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

            const currentUser = {
                email: user.email
            }
            console.log(currentUser);
            
            //get jwt token
    fetch('http://localhost:5000/jwt', {
        method: 'POST',
        headers: { 
            'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser),
    })
    .then(res=>res.json())
    .then(data=> {
        console.log(data);
        //local storege is the easiest but not the best place to store jwt token
        localStorage.setItem('genious-token', data.token);

        
    })

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
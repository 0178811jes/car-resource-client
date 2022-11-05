import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Signup = () => {

    const {createUser} = useContext(AuthContext);

    const handleSignup = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();

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
        <div className="hero w-full my-20">
        <div className="hero-content flex-col grid gap-20 md:grid-cols-2 lg:flex-row">
            <div className="text-center lg:text-left">

                <img className="w-3/4" src={img} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                <form onSubmit={handleSignup} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Your Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" placeholder="email" className="input input-bordered" required/>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required/>
                        
                    </div>
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Signup" />

                    </div>
                </form>
                <p className="text-center">Already have an account <Link className="text-orange-600 font-bold" to="/login">Login</Link></p>
            </div>
        </div>
    </div>
    );
};

export default Signup;
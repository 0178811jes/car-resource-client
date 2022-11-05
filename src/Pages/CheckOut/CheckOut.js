import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const {_id, title, price } = useLoaderData();

    const {user} = useContext(AuthContext);

    const handlePlaceOrder= event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregister';
        const phone = form.phone.value;
        const message = form.message.value;
        const order = {
            service:_id,
            serviceName:title,
            price,
            customer:name,
            email, 
            phone,
            message
        }

        // if(phone.length > 0) {
        //     alert('phone number shuld be 10 carecters are longer')
        // }
        // else{

        // }

        fetch('http://localhost:5000/orders', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genious-token')}`
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('order placed successfully')
                form.reset();
            }
        })
        .catch(err => console.error(err));



    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl">You are about to order: {title}</h2>
                <h4 className="text-3xl">Price: ${price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <input name="firstName" type="text" placeholder="first name" className="input input-bordered w-full" />
                <input name="lastName" type="text" placeholder="last name" className="input input-bordered w-full" />
                <input name="phone" type="text" placeholder="your phone" className="input input-bordered w-full" required /> 
                <input name="email" type="text" placeholder="your email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
                </div>
                <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your message"></textarea>
                <input className='btn' type="submit" value="Your order" />
            </form>
        </div>
    );
};

export default CheckOut;
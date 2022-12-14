import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';

const Orders = () => {
    const { user, logout } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);



    useEffect(() => {
        fetch(`https://genious-car-server-three.vercel.app/orders?email=${user?.email}`, {
            headers:{
                authorization: `Bearer ${localStorage.getItem('genious-token')}`
            }
        })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    return logout();
                }
                return res.json();
            })
            .then(data => {
                
                setOrders(data)
            })

    }, [user?.email, logout])

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure you want to cancel this order')
        if(proceed){
            fetch(`https://genious-car-server-three.vercel.app/orders/${id}`,{
                method: 'DELETE',
                headers:{
                    authorization: `Bearer ${localStorage.getItem('genious-token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted successfully');
                    const remaining = orders.map(odr => odr._id !== id);
                    setOrders(remaining);
                }
            })
        }
    }


    const handleUpdate = id =>{
        fetch(`https://genious-car-server-three.vercel.app/orders/${id}`, {
            method: 'PATCH',
           headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('genious-token')}`
           } ,
           body: JSON.stringify({status: 'approved'}),
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = orders.filter(odr => odr._id !== id);
                const approving = orders.find(odr => odr._id === id);
                approving.status = 'approved';

                const newOrders = [approving, ...remaining];
                setOrders(newOrders);
            }
        })
    }



    return (
        <div>
            <h2 className="text-4xl">You have {orders.length} order</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                   
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th>message</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                            orders.map(order => <OrdersRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                            ></OrdersRow>)
                       }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;
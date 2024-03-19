import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/Admin/apiMethods';
import { setUserList } from '../../../features/admin/adminSlice';
import TableData from './TableData';
import { useDispatch } from 'react-redux';
import Spinner from '../../User/Spinner/Spinner';

function UsersList() {
    const dispatch = useDispatch()
    
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getAllUsers()
            .then(async (response) => {
                dispatch(setUserList(response));
                setUsers(response);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [dispatch]);

    const updateUserStatus = (userId, newStatus) => {
        const updatedUsers = users.map(user => {
            if (user._id === userId) {
                return { ...user, blocked: newStatus };
            }
            return user;
        });
        setUsers(updatedUsers);
    };
 
    if (loading) {
       return <Spinner/>; // Show loading indicator while fetching data
    }
    
    return (
        <section className="container px-4 mx-auto">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">USER MANAGEMENT</h2>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">100 users</span>
            </div>
            
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Image</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4  py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Name</span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Status</span>
                                                <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center">
                                                <span>Phone</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4"></svg>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>
                                        <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Teams</th>
                                        <th scope="col" className="relative py-3.5 px-4">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                               
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {users.map((user, index) => (
                                        <TableData key={index} user={user} updatedUsers={updateUserStatus}/>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UsersList;

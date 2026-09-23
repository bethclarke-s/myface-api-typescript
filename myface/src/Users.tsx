import { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import type { UserModel } from '../../src/models/api/userModel.ts';
import type { Page } from '../../src/models/api/page.ts';

function Users() {

    const [userList, setUserList] = useState<Page<UserModel>>();
    const [searchParams] = useSearchParams();

    function updateUserList(data: Page<UserModel>) {
        setUserList(data);
    }
    
    useEffect(() => {
        let cancelled = false;
        const api_url = `http://localhost:3001/users?${searchParams}`;
        fetch(api_url)
            .then(response => response.json())    
            .then(data => { if (!cancelled) updateUserList(data)});
        return () => { cancelled = true };
    },[searchParams.toString()])

    function generateListOfUsers() {
        if (userList === undefined) return <p> Loading users...</p>
        let users = [];
        for (const user of userList.results) {
            users.push(<li key={user.id}> <Link to={`/users/${user.id}`}> {user.name} </Link> </li>)
        }
        return <>
        <ol>
            {users}
        </ol>   
        </>
    };

    
    return <>
    <h1>Users</h1>
    {generateListOfUsers()}
    {userList?.previous && <Link to={userList.previous} >Previous page</Link>}
    {userList?.next && <Link to={userList.next}>Next page</Link>}
    </>
}

export default Users;
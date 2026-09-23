import { useState, useEffect, type CSSProperties } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import type { UserModel } from '../../src/models/api/userModel.ts';
import type { Page } from '../../src/models/api/page.ts';
import './Users.css';

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
        if (userList === undefined) return <p className="loading"> Loading users...</p>
        let users = [];
        for (const [index, user] of userList.results.entries()) {
            users.push(
                <li key={user.id} className="user-card card" style={{ "--i": index } as CSSProperties}>
                    <Link to={`/users/${user.id}`}>
                        <span className="avatar-ring">
                            <img className="avatar" src={user.profileImageUrl} alt="" />
                        </span>
                        <span className="user-name">{user.name}</span>
                        <span className="user-handle">@{user.username}</span>
                        <span className="view-profile">View profile →</span>
                    </Link>
                </li>
            )
        }
        return <>
        <ol className="user-grid">
            {users}
        </ol>
        </>
    };


    return <div className="page">
    <h1 className="page-title"><span>Users</span> 👋</h1>
    <p className="page-subtitle">{userList?.total ?? 0} lovely people on MyFace</p>
    {generateListOfUsers()}
    <div className="pager">
        {userList?.previous && <Link className="prev" to={userList.previous} >← Previous page</Link>}
        {userList?.next && <Link className="next" to={userList.next}>Next page →</Link>}
    </div>
    </div>
}

export default Users;
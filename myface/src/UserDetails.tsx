import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import type { UserModel } from '../../src/models/api/userModel.ts';

function UserDetails() {

    const [user, setUser] = useState<UserModel>();
    const { id } = useParams();

    function updateUser(data: UserModel) {
        //console.log(data)
        setUser(data);
    }

    useEffect(() => {
        let cancelled = false;
        const api_url = `http://localhost:3001/users/${id}`;
        fetch(api_url)
            .then(response => response.json())    
            .then(data => { if (!cancelled) updateUser(data)});
        return () => { cancelled = true };
    },[])

    function generateUserProfileContent() {
    if (user === undefined) return <p> Loading profile... </p>
    
    return <>
        <img src={user.coverImageUrl}/>
        <h1>Hello {user.name}!</h1>
        <img src={user.profileImageUrl}/>
        <h2> 
            Contact details: 
        </h2>
        <ul>
            <li> Username: {user.username} </li>
            <li> Email: {user.email} </li>
        </ul>
    </>
    }

    function generateUsersPreviousPosts(posts) {

        const post_content = [];

        for (let post of posts) {
            post_content.push(
                <li key={post.id}>
                <p>New post from user {post.postedBy.username} - {new Date(post.createdAt).toLocaleString("en-GB")}</p>
                <p>{post.message}</p>
                <img src={post.imageUrl}/>
                {returnNumberOfLikesandDislikesHtml(post)}
            </li>
            );
        }
        return post_content
    }
    
    function generateIndividualUserPageContent() {
        return <>
        {generateUserProfileContent()}
        </>
    };
    
    return <>
    {generateIndividualUserPageContent()}
    </>
}

export default UserDetails;
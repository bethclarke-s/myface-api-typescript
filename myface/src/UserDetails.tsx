import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import type { UserModel } from '../../src/models/api/userModel.ts';
import './UserDetails.css';

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
    if (user === undefined) return <p className="loading"> Loading profile... </p>

    return <>
        <article className="profile card">
            <div className="profile-cover">
                <img src={user.coverImageUrl} alt=""/>
            </div>
            <div className="profile-head">
                <span className="profile-avatar-ring">
                    <img className="profile-avatar" src={user.profileImageUrl} alt=""/>
                </span>
                <div className="profile-names">
                    <h1>Hello {user.name}! <span className="wave">👋</span></h1>
                    <p className="handle">@{user.username}</p>
                </div>
            </div>
            <div className="profile-stats">
                <div className="stat">
                    <div className="value">{user.posts?.length ?? 0}</div>
                    <div className="label">Posts</div>
                </div>
                <div className="stat">
                    <div className="value">{user.likes?.length ?? 0}</div>
                    <div className="label">Likes</div>
                </div>
                <div className="stat">
                    <div className="value">{user.dislikes?.length ?? 0}</div>
                    <div className="label">Dislikes</div>
                </div>
            </div>
            <div className="profile-contact">
                <h2>
                    Contact details
                </h2>
                <ul className="contact-list">
                    <li> <span className="key">Username</span> <span className="value">{user.username}</span> </li>
                    <li> <span className="key">Email</span> <span className="value">{user.email}</span> </li>
                </ul>
            </div>
        </article>
        <Link className="back-link" to="/users">← Back to everyone</Link>
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
    
    return <div className="page">
    {generateIndividualUserPageContent()}
    </div>
}

export default UserDetails;
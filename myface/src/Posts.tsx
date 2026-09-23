import { useState, useEffect, type CSSProperties } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import type { PostModel } from '../../src/models/api/postModel.ts';
import type { Page } from '../../src/models/api/page.ts';
import './Posts.css';

function Posts() {
   
    const [postList, setPostList] = useState<Page<PostModel>>();
    const [searchParams] = useSearchParams();

    function updatePostList(data: Page<PostModel>){
        setPostList(data);
    }

    useEffect(() => {
        let cancelled = false;
        const api_url = `http://localhost:3001/posts?${searchParams}`;
        console.log(searchParams)
        console.log(api_url)
        fetch(api_url)
            .then(response => response.json())    
            .then(data => { if (!cancelled) updatePostList(data)});
        return () => { cancelled = true };
    },[searchParams.toString()])
    
    function returnNumberOfLikesandDislikesHtml(post: PostModel){
        return <div className="post-reactions">
        {post.likedBy.length === 1 && <p className="reaction likes"> <span className="emoji">💖</span> Liked by {post.likedBy[0].name}. </p>}
        {post.likedBy.length > 1 && <p className="reaction likes"> <span className="emoji">💖</span> Liked by {post.likedBy[0].name} and {post.likedBy.length - 1} others. </p>}
        {post.dislikedBy.length === 1 && <p className="reaction dislikes"> <span className="emoji">💔</span> Disliked by {post.dislikedBy[0].name}. </p>}
        {post.dislikedBy.length > 1 && <p className="reaction dislikes"> <span className="emoji">💔</span> Disliked by {post.dislikedBy[0].name} and {post.dislikedBy.length - 1} others. </p>}
        </div>;
    }

    function generateEachPost(post: PostModel, index: number) {
        return (
            <li key={post.id} className="post-card card" style={{ "--i": index } as CSSProperties}>
                <div className="post-header">
                    <span className="avatar-dot">{post.postedBy.username.charAt(0).toUpperCase()}</span>
                    <span className="who">
                        <span className="handle">@{post.postedBy.username}</span>
                        <time>{new Date(post.createdAt).toLocaleString("en-GB")}</time>
                    </span>
                    <span className="badge">New post</span>
                </div>
                <p className="post-message">{post.message}</p>
                <div className="post-media">
                    <img className="post-image" src={post.imageUrl} alt=""/>
                </div>
                {returnNumberOfLikesandDislikesHtml(post)}
            </li>
        );
    }

    function generatePosts(){
        if (postList === undefined) return <p className="loading"> Loading posts...</p>
        let posts = [];
        for (const [index, post] of postList.results.entries()) {
            posts.push(generateEachPost(post, index));
        }
        return <>
        <ol className="post-feed">
            {posts}
        </ol>
        </>
    }

    return <div className="page">
    <h1 className="page-title"><span>Posts</span> ✨</h1>
    <p className="page-subtitle">The freshest {postList?.total ?? 0} moments from your feed</p>

    {generatePosts()}
    <div className="pager">
        {postList?.previous && <Link className="prev" to={postList.previous} >← Previous page</Link>}
        {postList?.next && <Link className="next" to={postList.next}>Next page →</Link>}
    </div>
    </div>
}

export default Posts;
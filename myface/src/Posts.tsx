import { useState, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import type { PostModel } from '../../src/models/api/postModel.ts';
import type { Page } from '../../src/models/api/page.ts';

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
        return <>
        {post.likedBy.length === 1 && <p> Liked by {post.likedBy[0].name}. </p>}
        {post.likedBy.length > 1 && <p> Liked by {post.likedBy[0].name} and {post.likedBy.length - 1} others. </p>}
        {post.dislikedBy.length === 1 && <p> Disliked by {post.dislikedBy[0].name}. </p>}
        {post.dislikedBy.length > 1 && <p> Disliked by {post.dislikedBy[0].name} and {post.dislikedBy.length - 1} others. </p>}
        </>;
    }

    function generateEachPost(post: PostModel) {
        return (
            <li key={post.id}>
                <p>New post from user {post.postedBy.username} - {new Date(post.createdAt).toLocaleString("en-GB")}</p>
                <p>{post.message}</p>
                <img src={post.imageUrl}/>
                {returnNumberOfLikesandDislikesHtml(post)}
            </li>
        );
    }

    function generatePosts(){
        if (postList === undefined) return <p> Loading posts...</p>
        let posts = [];
        for (const post of postList.results) {
            posts.push(generateEachPost(post));
        }
        return <>
        <ol>
            {posts}
        </ol>   
        </>
    }
    
    return <>
    <h1>Posts</h1>
    
    {generatePosts()}
    {postList?.previous && <Link to={postList.previous} >Previous page</Link>}

    {postList?.next && <Link to={postList.next}>Next page</Link>}
    </>
}

export default Posts;
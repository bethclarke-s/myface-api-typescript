import { useState, useEffect } from "react";

function Posts() {

    interface PostUserModel {
        id: number;
        name: string;
        username: string;
        email: string;
    }

    interface PostModel {
        id: number;
        message: string;
        imageUrl: string;
        createdAt: string;
        postedBy: PostUserModel;
        likedBy: PostUserModel[];
        dislikedBy: PostUserModel[];
    }

    interface Page<T> {
        results: T[];
        previous: string | null;
        next: string | null;
        total: number;
    }

   
    const [postList, setPostList] = useState<Page<PostModel>>();
    
    function updatePostList(data: Page<PostModel>){
        setPostList(data);
        console.log(data);
    }

    useEffect(() => {
        fetch("http://localhost:3001/posts").then(response => response.json()).then(data => updatePostList(data));
    },[])
    
    function returnNumberOfLikesandDislikesHtml(post: PostModel){

        let text = [];

        if (post.likedBy.length === 1) {
            text.push(<p> Liked by {post.likedBy[0].name}. </p>);
        } else if (post.likedBy.length > 1) {
             text.push(<p> Liked by {post.likedBy[0].name} and {post.likedBy.length - 1} others. </p>);
        }

        if (post.dislikedBy.length === 1) {
            text.push(<p> Disliked by {post.dislikedBy[0].name}. </p>);
        } else if (post.dislikedBy.length > 1) {
             text.push(<p> Disliked by {post.dislikedBy[0].name} and {post.dislikedBy.length - 1} others. </p>);
        }

        return text        
    }

    function generateEachPost(post: PostModel) {
        return <>
            <li key={post.id}>
                <p>New post from user {post.postedBy.username} - {new Date(post.createdAt).toLocaleString("en-GB")}</p>
                <p>{post.message}</p>
                <img src={post.imageUrl}/>
                {returnNumberOfLikesandDislikesHtml(post)}
            </li>
        </>
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
    {postList?.previous && <a href={postList.previous}>Previous page</a>}
    {postList?.next && <a href={postList.next}>Next page</a>}
    </>
}

export default Posts;
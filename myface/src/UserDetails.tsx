import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

function UserDetails() {

    interface UserPostModel {
        id: number;
        message: string;
        imageUrl: string;
        createdAt: Date;
    }

    interface UserModel {
        id: number;
        name: string;
        username: string;
        profileImageUrl: string;
        coverImageUrl: string;
        email: string;
        posts: UserPostModel[];
        likes: UserPostModel[];
        dislikes: UserPostModel[];
    }

    interface Page<T> {
        results: T[];
        previous: string | null;
        next: string | null;
        total: number;
    }

    const { username } = useParams();

    function generateIndividualUserPageContent() {
        return <h1>Hello {username}</h1>
    };

    
    return <>
    {generateIndividualUserPageContent()}
    </>
}

export default UserDetails;
import { createContext, useContext, useEffect, useState } from "react";
import commentService from "../services/commentService.js";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig.js";

export const CommentContext = createContext({

});

export function CommentProvider({ children }){

    const [ comments, setComments] = useState([]);
    const [ loading, setLoading ] = useState(false)
    
    useEffect(() => {
        loadComments();
    },[]);

    async function loadComments() {
        const commentsData = await commentService.getAllComments();
        setComments(commentsData);            
    }

    async function createComment(commentData) {
        setLoading(true);

        try {
            const newComment = await commentService.create(commentData)
            return newComment;
        } catch (error) {
            console.error('Error create comment', error)
        } finally {
            setLoading(false)
        }
    }

    async function updateComment(commentId, updateData) {
        try {
            setLoading(true);
            const updatedComment = await commentService.update(commentId, updateData)
            setComments( previous => 
                previous.map( comment => 
                    comment.id === commentId 
                    ? {...comment, ...updateData}  
                    : comment
                )
            )
            return updatedComment
        } catch (error) {
            console.error('Error update comment', error)
        } finally {
            setLoading(false)
        }
    }

    function subscribeToComments(sightId) {
        try {
            return commentService.subscribeToComments(sightId, setComments);
        } catch (error) {
            console.error('Error subscribing to comment', error)            
        }
    }
    
    async function removeComment(commentId) {
        try {
            setLoading(true);
            await commentService.remove(commentId)
            // setComments((commentsList) => commentsList.filter(comment => comment.id !== commentId)) // snapshot will refresh it
        } catch (error) {
            console.error('Error remove comment', error)
        } finally {
            setLoading(false)
        }
    }

    const contextValue = {
        comments,
        loading,
        loadComments,
        createComment,
        updateComment,
        subscribeToComments,
        removeComment,
    }

    return (
        <CommentContext.Provider value={contextValue}>
            { children }
        </CommentContext.Provider>
    )
}

export const useComment = () => useContext(CommentContext)
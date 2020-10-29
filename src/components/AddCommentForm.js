import React, { useState } from 'react';

const AddCommentForm = ({ articleName, setArticleInfo }) => {
    const [ username, setUserName ] = useState('');
    const [ commentText, setCommentText ] = useState('');

    const addComment = async () => {
        const result = await fetch(`/api/articles/${articleName}/add-comment`, {
            method: 'post',
            body: JSON.stringify({ username, text: commentText}),
            headers: {
                'Content-type': 'application/json'
            }
        });

        const body = await result.json();
        setArticleInfo(body);
    }


    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                name:
                <input
                    type="text"
                    value={username}
                    onChange={e => setUserName(e.target.value)}
                />
            </label>
            <label>
                comment:
                <textarea name="" id="" cols="50" rows="4" value={commentText} onChange={ e => setCommentText(e.target.value)}/>
            </label>

            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    );
};

export default AddCommentForm;
import React from "react";
import articleContent from "./article-content";

const ArticlePage = ({ match }) => {
    const { name } = match.params;
    const article = articleContent.find(article => article.name === name);
    if(!article) {
        return <h1>Page doesn't exist</h1>
    }
    return (
        <div>
            <h1>{article.title}</h1>
            {
                article.content.map((paragraph, key) => <p key={key}>{paragraph}</p>)
            }
        </div>
    );
};

export default ArticlePage;
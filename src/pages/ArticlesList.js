import React from "react";
import { Link } from "react-router-dom";
import articleContent from "./article-content";

const ArticlesList = () => {
    return (
        <div>
            <h1>Articles</h1>
            {
                articleContent.map((article, key) => (
                    <h3 key={key}><Link to={`/article/${article.name}`}>{article.title}</Link></h3>
                ))
            }
        </div>
    );
};

export default ArticlesList;
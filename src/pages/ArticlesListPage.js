import React from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";

const ArticlesListPage = () => {
    return (
        <div>
            <h1>Articles</h1>
            <ArticlesList articles={articleContent}/>
        </div>
    );
};

export default ArticlesListPage;
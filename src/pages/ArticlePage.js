import React from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import PageNotFound from "./PageNotFound";

const ArticlePage = ({ match }) => {
    const { name } = match.params;
    const article = articleContent.find(article => article.name === name);
    if(!article) {
        return <PageNotFound />
    }

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <div>
            <h1>{article.title}</h1>
            {
                article.content.map((paragraph, key) =>
                    <p key={key}>{paragraph}</p>
                )
            }
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles}/>
        </div>
    );
};

export default ArticlePage;
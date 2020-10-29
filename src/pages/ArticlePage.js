import React, { useState, useEffect } from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import PageNotFound from "./PageNotFound";

const ArticlePage = ({ match }) => {
    const { name } = match.params;
    const article = articleContent.find(article => article.name === name);


    const [ articleInfo, setArticleInfo ] = useState({ upvotes: 0, comments: []});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        }
        fetchData();
    }, [name]);

    if(!article) {
        return <PageNotFound />
    }

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <div>
            <h1>{article.title}</h1>
            <p>This post has been upvotes {articleInfo.upvotes} times</p>
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
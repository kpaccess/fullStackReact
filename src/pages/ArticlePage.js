import React, { useState, useEffect } from "react";
import articleContent from "./article-content";
import ArticlesList from "../components/ArticlesList";
import PageNotFound from "./PageNotFound";
import CommentsList from "../components/CommentsList";
import UpvoteSection from "../components/UpvoteSection";

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
            <UpvoteSection
                upvotes={articleInfo.upvotes}
                articleName={name}
                setArticleInfo={setArticleInfo}
            />
            {
                article.content.map((paragraph, key) =>
                    <p key={key}>{paragraph}</p>
                )
            }
            <CommentsList comments={articleInfo.comments} />
            <h3>Other Articles:</h3>
            <ArticlesList articles={otherArticles}/>
        </div>
    );
};

export default ArticlePage;
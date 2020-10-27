import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ArticlesList from "./pages/ArticlesList";
import ArticlePage from "./pages/ArticlePage";
import NavBar from "./NavBar";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="App">
      <div id="page-body">
          <NavBar />
          <Switch>
              <Route path="/" component={HomePage}  exact/>
              <Route path="/about" component={AboutPage} />
              <Route path="/articles-list" component={ArticlesList} />
              <Route path="/article/:name" component={ArticlePage}/>
              <Route component={PageNotFound}/>
          </Switch>
      </div>
    </div>
  );
}

export default App;

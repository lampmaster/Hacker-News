import React from "react";
import {TopBar} from "./components/Topbar/Topbar";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {NewsList} from "./pages/NewsList/NewsList";
import {News} from "./pages/News/News";
import {NewsState} from "./context/news/NewsState";
import {Loader} from "./components/Loader/Loader";

function App() {
  return (
      <NewsState>
            <Loader/>
            <BrowserRouter>
                <TopBar/>
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={NewsList}/>
                        <Route path="/news/:id" component={News}/>
                    </Switch>
                </div>
            </BrowserRouter>
      </NewsState>
  );
}

export default App;

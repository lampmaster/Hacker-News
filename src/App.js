import React from "react";
import {TopBar} from "./components/Topbar/Topbar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import NewsList from "./pages/NewsList/NewsList";
import News from "./pages/News/News";
import Message from "./components/Message/Message";

function App() {
  return (
        <BrowserRouter>
            <TopBar/>
            <Message/>
            <div className="container">
                <Switch>
                    <Route path="/" exact component={NewsList}/>
                    <Route path="/news/:id" component={News}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

export default App;

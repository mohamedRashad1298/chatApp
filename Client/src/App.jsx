import "./App.css";
import { Fragment } from "react";
import { Switch ,Route ,Redirect } from "react-router-dom/cjs/react-router-dom";
import AuthPage from "./Pages/AuthPage";
import ChatPage from "./Pages/ChatPage";

function App() {
  return (
    <Fragment>
      <Switch>
      <Route path='/auth' component={AuthPage}/>
      <Route path='/chat' component={ChatPage}/>
      <Route path='/' exact>
       <Redirect to='/chat'/>
      </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

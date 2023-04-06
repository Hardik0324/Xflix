import { Route, Switch } from "react-router-dom";
import './App.css';
import Landing from "./Landing";
import VideoPage from "./videoPage";

export const config = {
  endpoint: "https://4c33c0fa-424d-4156-8366-a48f1ec83e9f.mock.pstmn.io/v1",
};

function App() {
  return (
    <Switch>
      <Route exact path="/"><Landing/></Route>
        <Route exact path="/video/:id"><VideoPage/></Route>
    </Switch>
  );
}

export default App;

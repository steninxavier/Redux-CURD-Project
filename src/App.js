
import React from 'react';
import { Switch, Route} from 'react-router-dom';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import Home from './pages/Home';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} >
        </Route>
        <Route exact path="/addUser" component={AddUser} ></Route>
        <Route exact path="/editUser/:id" component={EditUser} ></Route>
      </Switch>
    </div>
  );
}

export default App;

import './App.css';
import {Router, Route, Switch} from './components/Router';
import {AuthPage, HomePage} from './pages/Pages'

const App = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={AuthPage}/>
      <Route exact path="/home" component={HomePage}/>
      </Switch>
    </Router>
  )
}
export default App;


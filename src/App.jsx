import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from "./Components/Landing/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    
  },
});


export const App = () => (
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Main}></Route>
          </Switch>
        </Router>
    </ThemeProvider>
)

import {
  ChakraProvider,
  theme as ChakraTheme
} from "@chakra-ui/react"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from "./Components/Landing/Main";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
  }
});


export const App = () => (
  <ChakraProvider theme={ChakraTheme}>
    <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path='/' component={Main}></Route>
          </Switch>
        </Router>
    </ThemeProvider>
  </ChakraProvider>
)

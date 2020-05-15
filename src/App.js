import React, { Component } from 'react';
import { MAIN } from "./main";
import { UI } from "./components/ui/UI";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



export default class App extends Component{

  componentWillMount() {
    new MAIN()
    let root = document.getElementById('root')
    root.style.backgroundColor = '#121212'
    root.style.margin = '0'
    root.style.padding = '0'
    root.style.position = 'relative'
    document.body.style.backgroundColor = '#121212'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
  }

  theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffb74d',
      },
      secondary: {
        main: '#ff8a65',
      },
      
    },
  });


  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <UI />
      </ThemeProvider>
      
    );
  }
}
import React, { Component } from 'react';
import { MAIN } from "./main";
import { UI } from "./components/ui/UI";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



export default class App extends Component{

  constructor(props) {
    super(props)
    let main = new MAIN()
    this.GLOBALS = main.GLOBALS
    
    let root = document.getElementById('root')
    root.style.backgroundColor = '#121212'
    root.style.margin = '0'
    root.style.padding = '0'
    root.style.position = 'relative'
    root.style.overflow = 'hidden'
    document.body.style.backgroundColor = '#121212'
    document.body.style.margin = '0'
    document.body.style.padding = '0'
    document.body.style.overflow = 'hidden'
  }

  theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#ffb74d',
      },
      secondary: {
        main: '#ffffff',
      },
      
    },
  });


  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <UI globals={this.GLOBALS} />
      </ThemeProvider>
      
    );
  }
}
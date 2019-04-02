import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    useNextVariants: true,
  },
  palette: {
    primary: grey,
    secondary: green,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

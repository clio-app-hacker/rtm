import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: colors.blue,
    secondary: colors.green,
  },
  status: {
    danger: 'orange',
  },
});

// dark them
// const theme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// });

export default theme;

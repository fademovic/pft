// Basic theme file just to show that each project should have some kind of global theme config
// I installed Material UI to easily use some of existing components for my project
// If we want to globaly redesign some of MUI components we can do it here and import it in the app through theme provider

const colors = {
  primary: '#0062ff',
  secondary: '#fc5a5a',
  default: '#e8e8ec',
  textPrimary: '#171725',
  textSecondary: '#92929d',
  background: '#fafafb',
  success: '#4fd120',
  error: '#ff0057'
};

const theme = {
  colors
};

export default theme;

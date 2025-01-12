import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
        MuiInput: {
            styleOverrides: {
                root: {
                    color: '#fff',
                    backgroundColor: '#333',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: '#444',
                    },
                    '&.Mui-focused': {
                        backgroundColor: '#444',
                        borderColor: '#666',
                    },
                    '& .MuiInputBase-input': {
                        color: '#fff',
                    },
                    '& .MuiInput-underline:before': {
                        borderBottomColor: '#666',
                    },
                    '& .MuiInput-underline:hover:before': {
                        borderBottomColor: '#999',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: '#fff',
                    },
                },
            },
        },
      MuiListItemText: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              fontSize: '2rem',
            }
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            "& .MuiMenuItem-root": {
              fontSize: '1.125rem',
            }
          },
        },
      },
    },
    typography: {
      h2: {
        fontSize: '4rem',
        fontFamily: 'var(--font-lavigne-display)',
        fontWeight: '300',
        fontStyle: 'normal'
      },
      h3: {
        fontSize: '2.5rem',
        fontFamily: 'var(--font-lavigne-display)',
        fontWeight: '300',
        fontStyle: 'normal'
      },
      h4: {
        fontSize: '2rem',
        fontFamily: 'var(--font-lavigne-display)',
        fontWeight: '300',
        fontStyle: 'normal'
      },
      h6: {
        fontSize: '1.125rem',
        fontFamily: 'var(--font-lavigne-display)',
        fontWeight: '400',
        fontStyle: 'normal'
      },
      body1: {
        fontSize: '1rem',
        fontFamily: 'var(--font-lavigne-text)',
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: '1.2'
      },
    },
  });
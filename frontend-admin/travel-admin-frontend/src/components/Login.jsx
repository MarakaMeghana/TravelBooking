// App.jsx
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = { email: '', password: '' };
    if (!email) tempErrors.email = 'Email is required';
    if (!password) tempErrors.password = 'Password is required';
    setErrors(tempErrors);

    if (!tempErrors.email && !tempErrors.password) {
      console.log('Login Successful:', { email, password });
      // Handle login logic here
    }
  };

  return (
    <CssVarsProvider>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: 360,
            p: 4,
            borderRadius: 'md',
            boxShadow: 'md',
            backgroundColor: '#fff',
          }}
        >
          <Typography
            level="h4"
            component="h1"
            sx={{ mb: 3, textAlign: 'center', color: '#007bff' }}
          >
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl sx={{ mb: 2 }}>
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={errors.email ? 'danger' : 'primary'}
              />
              {errors.email && (
                <Typography level="body3" color="danger" sx={{ mt: 0.5 }}>
                  {errors.email}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ mb: 2 }}>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color={errors.password ? 'danger' : 'primary'}
              />
              {errors.password && (
                <Typography level="body3" color="danger" sx={{ mt: 0.5 }}>
                  {errors.password}
                </Typography>
              )}
            </FormControl>

            <Button type="submit" sx={{ width: '100%', mt: 1 }}>
              Login
            </Button>
          </form>
        </Sheet>
      </Box>
    </CssVarsProvider>
  );
}

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import firebase from 'firebase/app';
import { Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
import GoogleIcon from '@material-ui/icons/GTranslate';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import TwitterIcon from '@material-ui/icons/Twitter';

import Button from 'src/components/Button';
import Link from 'src/components/Link';
import Paper from 'src/components/Paper';
import White from 'src/components/White';
import { FirebaseContext } from 'src/components/Firebase';
import { paths } from 'src/constants';
import { useStyles } from './Login.styles';

export type FormData = {
  email: string;
  password: string;
};

interface Props {
  disabled?: boolean;
  onSubmit: (form: FormData) => void;
  onSocialLogin: (provider: firebase.auth.AuthProvider) => void;
}

const Login: React.FC<Props> = ({ disabled, onSubmit, onSocialLogin }) => {
  const classes = useStyles();
  const sm = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const { handleSubmit, register, errors } = useForm<FormData>();
  const firebase = useContext(FirebaseContext);

  const social: {
    key: string;
    icon: JSX.Element;
    provider: firebase.auth.AuthProvider;
  }[] = [
    {
      key: 'facebook',
      icon: <FacebookIcon />,
      provider: firebase.authProviders.facebook,
    },
    {
      key: 'github',
      icon: <GitHubIcon />,
      provider: firebase.authProviders.github,
    },
    {
      key: 'google',
      icon: <GoogleIcon />,
      provider: firebase.authProviders.google,
    },
    {
      key: 'twitter',
      icon: <TwitterIcon />,
      provider: firebase.authProviders.twitter,
    },
  ];

  return (
    <Container component="main" maxWidth="xs">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-cy="title">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                data-cy="login_email"
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                variant="outlined"
                fullWidth
                required
                autoFocus
                disabled={disabled}
                inputRef={register({
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address.',
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="login_password"
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                variant="outlined"
                fullWidth
                required
                disabled={disabled}
                inputRef={register({
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Must be at least 8 characters.',
                  },
                })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            disabled={disabled}
            data-cy="login_submit"
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={paths.resetPassword} data-cy="login_forgot_pw">
                {sm ? 'Forgot?' : 'Forgot password?'}
              </Link>
            </Grid>
            <Grid item>
              <Link to={paths.register} data-cy="login_register">
                {sm ? 'Register' : 'Need an account? Register'}
              </Link>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="space-between"
            className={classes.social}
          >
            {social.map(({ key, icon, provider }) => (
              <Grid item key={key}>
                <Tooltip title={key}>
                  <Fab
                    className={(classes as any)[key]}
                    aria-label={key}
                    size="medium"
                    onClick={() => onSocialLogin(provider)}
                    disabled={disabled}
                    data-cy={`login_social_${key}`}
                  >
                    {icon}
                  </Fab>
                </Tooltip>
              </Grid>
            ))}
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

import { useForm } from 'react-hook-form';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import React, { useMemo } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { UserQuery, Specialization, Program, UserInputType } from 'src/graphql';
import Button from '../Button';
import Paper from '../Paper';
import White from '../White';
import { useStyles } from './UserForm.styles';

interface Props {
  data: {
    programs: Program[];
    specializations: Specialization[];
  };
  mode: 'edit' | 'view';
  user: UserQuery['user'];
  disabled?: boolean;
  onSubmit: (user: UserInputType) => void;
}

const UserForm: React.FC<Props> = ({
  data,
  mode,
  user,
  disabled,
  onSubmit,
}) => {
  const classes = useStyles();
  const form = useForm<UserInputType>({ defaultValues: user });
  const { handleSubmit, register, errors, watch } = form;
  const { program_id } = watch();

  const specializations = useMemo(
    () =>
      program_id
        ? data.specializations.filter((s) => s.program_id === program_id)
        : [],
    [data.specializations, program_id],
  );

  const [title, action] =
    mode === 'edit' ? ['Update User', 'Update'] : ['User', null];

  return (
    <Container component="main" maxWidth="sm">
      <White />
      <Paper>
        <Avatar className={classes.avatar}>
          <AccountIcon />
        </Avatar>
        <Typography component="h1" variant="h5" data-cy="title">
          {title}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                data-cy="user_id"
                id="id"
                name="id"
                label="ID"
                autoComplete="id"
                variant="outlined"
                fullWidth
                disabled
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                data-cy="user_auth_provider"
                id="auth_provider"
                name="auth_provider"
                label="Auth Provider"
                autoComplete="auth_provider"
                variant="outlined"
                fullWidth
                disabled
                inputRef={register}
              />
            </Grid>
            {user?.email && (
              <Grid item xs={12}>
                <TextField
                  data-cy="user_email"
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  variant="outlined"
                  fullWidth
                  disabled
                  inputRef={register}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                data-cy="user_name"
                id="name"
                name="name"
                label="Name"
                autoComplete="name"
                variant="outlined"
                autoFocus
                fullWidth
                required
                disabled={disabled || mode === 'view'}
                inputRef={register({ required: true })}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                data-cy="user_program_id"
                id="program_id"
                name="program_id"
                label="Program"
                autoComplete="program_id"
                variant="outlined"
                fullWidth
                required
                disabled={disabled || mode === 'view' || !data.programs.length}
                inputRef={register({ required: true })}
                error={Boolean(errors.program_id)}
                helperText={errors.program_id?.message}
                SelectProps={{ native: true }}
              >
                {data.programs.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                data-cy="user_specialization_id"
                id="specialization_id"
                name="specialization_id"
                label="Specialization"
                autoComplete="specialization_id"
                variant="outlined"
                fullWidth
                required
                disabled={
                  disabled || mode === 'view' || !specializations.length
                }
                inputRef={register({ required: true })}
                error={Boolean(errors.specialization_id)}
                helperText={errors.specialization_id?.message}
                SelectProps={{ native: true }}
              >
                {specializations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            data-cy="user_submit"
            type="submit"
            size="large"
            fullWidth
            disabled={disabled}
          >
            {action}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UserForm;

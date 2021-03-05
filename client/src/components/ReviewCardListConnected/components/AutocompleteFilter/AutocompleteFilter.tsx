import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useEffect, useState } from 'react';
import { Option } from 'src/core/types';

import FilterButtonTray from '../FilterButtonTray';
import { useStyles } from './AutocompleteFilter.styles';

interface Props<T> {
  label?: string;
  options: Option<T>[];
  initialValue?: T[];
  onSubmit: (options: Option<T>[]) => void;
}

function AutocompleteFilter<T = string>({
  label = 'Options',
  options,
  initialValue = [],
  onSubmit,
}: Props<T>): React.ReactElement {
  const [value, setValue] = useState(
    options.filter((option) => initialValue.includes(option.value)),
  );
  const classes = useStyles();

  useEffect(() => {
    setValue(options.filter((option) => initialValue.includes(option.value)));
  }, [options, initialValue]);

  return (
    <FormGroup>
      <Autocomplete
        className={classes.autocomplete}
        ChipProps={{ style: { whiteSpace: 'normal' } }}
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
      />
      <FilterButtonTray
        fullWidth={false}
        onClear={() => setValue([])}
        onSubmit={() => onSubmit(value)}
      />
    </FormGroup>
  );
}

export default AutocompleteFilter;

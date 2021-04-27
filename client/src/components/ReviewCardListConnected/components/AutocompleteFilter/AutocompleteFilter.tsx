import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { Option } from 'src/core/types';

import FilterButtonTray from '../FilterButtonTray';
import { useStyles } from './AutocompleteFilter.styles';

interface Props {
  label?: string;
  options: Option[];
  initialValue?: string[];
  onSubmit: (optionIds: string[]) => void;
}

const AutocompleteFilter: React.FC<Props> = ({
  label = 'Options',
  options,
  initialValue = [],
  onSubmit,
}) => {
  const [value, setValue] = useState(
    options.filter((option) => initialValue.includes(option.value)),
  );
  const classes = useStyles();

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
        onSubmit={() => onSubmit(value.map((option) => option.value))}
      />
    </FormGroup>
  );
};

export default AutocompleteFilter;

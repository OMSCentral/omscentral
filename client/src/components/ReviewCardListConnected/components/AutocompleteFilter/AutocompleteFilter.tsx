import { FormGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState } from 'react';
import { Option } from 'src/core';

import FilterButtonTray from '../FilterButtonTray';
import { useStyles } from './AutocompleteFilter.styles';

interface Props {
  label?: string;
  options: Option[];
  initialValues: string[];
  onSubmit: (optionIds: string[]) => void;
}

const AutocompleteFilter: React.FC<Props> = ({
  label = 'Options',
  options,
  initialValues,
  onSubmit,
}) => {
  const classes = useStyles();

  const [values, setValues] = useState<Option[]>(
    options.filter(({ value }) => initialValues.includes(value)),
  );

  return (
    <FormGroup>
      <Autocomplete
        className={classes.autocomplete}
        ChipProps={{ style: { whiteSpace: 'normal' } }}
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        getOptionSelected={(option, value) => option.value === value.value}
        value={values}
        onChange={(_, values) => setValues(values)}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField {...params} variant="outlined" label={label} />
        )}
      />

      <FilterButtonTray
        onClear={() => setValues([])}
        onSubmit={() => onSubmit(values.map((option) => option.value))}
      />
    </FormGroup>
  );
};

export default AutocompleteFilter;

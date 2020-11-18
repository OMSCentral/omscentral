import { SelectInputProps } from '@material-ui/core/Select/SelectInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useContext } from 'react';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import { FirebaseContext } from 'src/components/Firebase/Firebase';
import { Nullable } from 'src/core';
import { Specialization } from 'src/graphql';

interface Props {
  className?: string;
  onChange: (changeTo: Nullable<Specialization>) => void;
  options?: Specialization[];
  value?: Specialization;
}

const SpecializationSelect: React.FC<Props> = ({
  className,
  onChange,
  options,
  value,
}) => {
  const firebase = useContext(FirebaseContext);

  const handleSpecializationChange: SelectInputProps['onChange'] = (event) => {
    const id = event.target.value;
    if (!id) {
      return onChange(null);
    }

    const specialization = options?.find((other) => other.id === id);
    if (!specialization) {
      return onChange(null);
    }

    firebase.analytics.logEvent('view_item_list', {
      list_name: specialization.name,
      item_list_name: specialization.name,
      item_list_id: specialization.id,
    });

    onChange(specialization);
  };

  if (!options?.length) {
    return null;
  }

  return (
    <FormControl variant="filled" className={className}>
      <InputLabel id="specialization-label">Specialization</InputLabel>
      <Select
        margin="dense"
        labelId="specialization-label"
        id="specialization"
        value={value?.id || ''}
        onChange={handleSpecializationChange}
      >
        <MenuItem value="">
          <Typography variant="overline">None</Typography>
        </MenuItem>
        {options.map(({ id, name }) => (
          <MenuItem key={id} value={id}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SpecializationSelect;

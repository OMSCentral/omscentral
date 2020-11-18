import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField, { BaseTextFieldProps } from '@material-ui/core/TextField';

interface Props {
  autoFocus?: boolean;
  disabled?: boolean;
  error?: boolean;
  getOptionLabel: (option?: any) => string;
  helperText?: React.ReactNode;
  id: string;
  inputRef?: (ref: any) => void;
  label?: string;
  margin?: BaseTextFieldProps['margin'];
  name?: string;
  noOptionsText?: React.ReactNode;
  onChange: (event: React.ChangeEvent<unknown>, value?: any) => void;
  options: any[];
  placeholder?: string;
  renderOption: (option: any) => React.ReactNode;
  required?: boolean;
  value: any;
  variant: 'filled' | 'outlined' | 'standard';
  'data-cy'?: string;
}

const Typeahead: React.FC<Props> = ({
  autoFocus,
  disabled,
  error,
  getOptionLabel,
  helperText,
  id,
  inputRef,
  label,
  margin,
  name,
  noOptionsText,
  onChange,
  options,
  placeholder,
  renderOption,
  required,
  value,
  variant,
  'data-cy': dataCy,
}) => (
  <Autocomplete
    id={`${id}_typeahead`}
    autoHighlight
    noOptionsText={noOptionsText}
    disabled={disabled}
    options={options}
    getOptionLabel={getOptionLabel}
    inputValue={value}
    onChange={onChange}
    renderOption={renderOption}
    renderInput={(params) => (
      <TextField
        {...params}
        data-cy={dataCy}
        autoFocus={autoFocus}
        error={error}
        fullWidth
        helperText={helperText}
        id={id}
        inputRef={inputRef}
        label={label}
        margin={margin}
        name={name}
        placeholder={placeholder}
        required={required}
        variant={variant}
      />
    )}
  />
);

export default Typeahead;

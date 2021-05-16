import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type Props = {
    label?: string,
    type: string,
    name: string,
    value: string | undefined,
    required?: boolean,
    error?: string,
    onChange: (value: string, name: string) => void,
}

const useStyles = makeStyles(() => ({
    textField: {
      marginRight: '20px',
      width: '250px',
    },
}));

const Input: React.FC<Props> = (props) => {
    const classes = useStyles();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        props.onChange(e.target.value, props.name);
    }

    return (
        <TextField
            className={classes.textField}
            name={props.name}
            id={props.name}
            onChange={handleInputChange}
            value={props.value}
            label={props.label}
            error={Boolean(props.error)}
            helperText={props.error}
            required={props.required}
        />
    );
};


export default Input;

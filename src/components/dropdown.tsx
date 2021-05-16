import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type Item = {
    value: string,
    label: string,
}
type Props = {
    label?: string,
    name: string,
    items: Array<Item>,
    value: string | undefined,
    className?: string,
    onChange: (value: string, name: string) => void,
}

const useStyles = makeStyles(() => ({
    select: {
      marginRight: '20px',
      width: '250px',
    },
}));

const Dropdown: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    const getDropdownItems = (): React.ReactNodeArray => {
        return props.items.map(item => (
            <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
        ));
    };

    const handleDropdownChange = (e: React.ChangeEvent<{ value: unknown }>): void => {
        props.onChange(e.target.value as string, props.name);
    }

    return (
        <FormControl>
            <InputLabel id={`${props.name}-label`}>{props.label}</InputLabel>
            <Select
                className={classes.select}
                labelId={`${props.name}-label`}
                id={props.name}
                name={props.name}
                value={props.value}
                onChange={handleDropdownChange}
            >
                <MenuItem value="" key="empty_field">Brak</MenuItem>
                {getDropdownItems()}
            </Select>
        </FormControl>
    );
};

export default Dropdown;

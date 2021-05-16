import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

type Props = {
    text?: string,
    onClick: () => void,
};

const useStyles = makeStyles(() => ({
    submitButton: {
      marginLeft: '10px',
      width: '100px',
    },
}));

const SubmitButton: React.FC<Props> = (props) => {
    const classes = useStyles();
    return (
        <Button
            className={classes.submitButton}
            color="primary"
            variant="contained"
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
}

export default SubmitButton;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { AppBar } from '@material-ui/core';
import { Box } from '@material-ui/core';

// TO-DO: A widget should include meta-data

const useStyles = makeStyles((theme) => ({
    widget: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    titleBar: {
        
    },
    content: {
        flexGrow: 1,
        "&>*": {
            height: "100%",
            width: "100%",
        },
        overflow: "hidden",
    },
}))

/**
 * A widget to display data in the grid
 */
 export default function Widget(props) {
    const {id, label, setProps, value, children} = props;
    const classes = useStyles();
    const theme = useTheme();
    
    return (
        <Paper 
            className={classes.widget}
            elevation={3}
        >
            <AppBar 
                className={`${classes.titleBar} titleBar`}
                position="static"
            >
                <Typography variant="h6">
                    Title
                </Typography>
            </AppBar>
            <Box className={classes.content} >
                {children}
            </Box>  
        </Paper> 
    );
}

Widget.defaultProps = {};

Widget.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * The value displayed in the input.
     */
    value: PropTypes.string,

    /**
     * Children.
     */
    children: PropTypes.node,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    setProps: PropTypes.func
};

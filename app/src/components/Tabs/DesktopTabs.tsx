import React, { useState } from 'react';
import { Tabs, Tab, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';

interface TabsProps {
    label: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullWidth: {
            width: '100%',
            maxWidth: 'none',
        },
        montserrat: {
            fontFamily: 'Montserrat'
        },
        wrapper: {
            justifyContent: 'normal',
            flexDirection: 'inherit'
        },
        marginTop: {
            marginTop: 20
        }
    }
    ))

const DesktopTabs: React.FC<TabsProps> = (props) => {

    const classes = useStyles();

    return (
        <Tabs
            value={0}
            classes={{
                root: classes.marginTop,
                indicator: clsx(classes.fullWidth, classes.montserrat)
            }}
            indicatorColor='primary'
        >
            <Tab
                classes={{
                    root: clsx(classes.montserrat, classes.fullWidth),
                    wrapper: classes.wrapper
                }}
                key={props.label}
                label={props.label} />
        </Tabs>
    )
}

export default DesktopTabs;
import React from 'react';
import { Tabs, Tab, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';
import clsx from 'clsx';

interface TabsProps {
    tabValue: number;
    setTabValue: React.Dispatch<React.SetStateAction<number>>;
    userLabel: string;
    companyLabel: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fullWidth: {
            width: '100%',
            maxWidth: 'none',
        },
        montserrat: {
            fontSize: 12,
            fontFamily: 'Montserrat'
        },
        tabRoot: {
            [theme.breakpoints.up('md')]: {
                width: '100%',
            },
            [theme.breakpoints.down('md')]: {
                width: '50%'
            },
            maxWidth: 'none'
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

const MobileTabs: React.FC<TabsProps> = (props) => {

    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        props.setTabValue(newValue);
    };

    return (
        <Grid item xs={12}>
            <Tabs
                value={props.tabValue}
                onChange={handleChange}
                classes={{
                    root: classes.marginTop,
                    indicator: clsx(classes.fullWidth, classes.montserrat)
                }}
                indicatorColor='primary'
            >
                <Tab
                    classes={{
                        root: clsx(classes.montserrat, classes.tabRoot),
                        wrapper: classes.wrapper
                    }}
                    key={props.userLabel}
                    label={props.userLabel} />
                <Tab
                    classes={{
                        root: clsx(classes.montserrat, classes.tabRoot),
                        wrapper: classes.wrapper
                    }}
                    key={props.companyLabel}
                    label={props.companyLabel} />
            </Tabs>
        </Grid>
    )
}

export default MobileTabs;
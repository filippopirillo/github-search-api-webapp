import React, { useState } from 'react';
import { Tabs, Tab, makeStyles, Theme, createStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface TabElement {
  label: string,
}

interface TabsProps {
  tabElements: TabElement[]
}

const getTabWidth = (tabElementCount: number) => {
  return 100 / tabElementCount + '%'
}

const useStyles = (tabWidth: string) => makeStyles((theme: Theme) =>
  createStyles({
    fullWidth: {
      width: '100%',
      maxWidth: 'none',
    },
    montserrat: {
      fontFamily: 'Montserrat'
    },
    tabRoot: {
      [theme.breakpoints.up('md')]: {
        width: '100%',
      },
      [theme.breakpoints.down('md')]: {
        width: tabWidth
      },
      maxWidth: 'none'
    },
    marginRight: {
      marginRight: 20
    },
    marginLeft: {
      marginLeft: 20
    },
    wrapper: {
      justifyContent: 'normal',
      flexDirection: 'inherit'
    }
  }
  ))

const CustomTabs: React.FC<TabsProps> = (props) => {

  const classes = useStyles(getTabWidth(props.tabElements.length))();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Tabs
      value={tabValue}
      onChange={handleChange}
      classes={{
        indicator: clsx(classes.fullWidth, classes.montserrat),
        flexContainer: clsx(
          // props.position == TabPosition.Left && classes.marginRight,
          // props.position == TabPosition.Right && classes.marginLeft
        )
      }}
      indicatorColor='primary'
    >
      {props.tabElements.map(tab =>
        <Tab
          classes={{
            root: clsx(classes.montserrat, classes.tabRoot),
            wrapper: classes.wrapper
          }}
          key={tab.label}
          label={tab.label} />
      )}
    </Tabs>
  )
}

export default CustomTabs;
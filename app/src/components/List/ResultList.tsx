import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar, ListItemSecondaryAction, Theme, makeStyles, createStyles } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { User } from '../../types/User';
import { Company } from '../../types/Company';

interface ResultListProps {
    items: {
        username: string,
        fullname: string,
        count: number
    }[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "#0000008A"
    }
  }
  ))

const ResultList: React.FC<ResultListProps> = (props) => {

    const classes = useStyles();
    return (
        <List dense >
            {props.items.map((item, idx) => (
                <div key={idx}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.username}
                            secondary={item.fullname}
                        />
                        <ListItemSecondaryAction classes={{root: classes.root}}>
                            {item.count}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    )
}

export default ResultList;
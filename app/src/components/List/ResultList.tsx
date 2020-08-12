import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { User } from '../../types/User';

interface ResultListProps {
    users: User[]
}

const ResultList: React.FC<ResultListProps> = (props) => {
    return (
        <List dense >
            {props.users.map((user, idx) => (
                <div key={idx}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.username}
                            secondary={user.fullname}
                        />
                    </ListItem>
                    <Divider />
                </div>
            ))}
        </List>
    )
}

export default ResultList;
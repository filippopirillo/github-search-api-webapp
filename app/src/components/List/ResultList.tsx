import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Divider, Avatar, ListItemSecondaryAction, Theme, makeStyles, createStyles, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { OrderType } from '../../types';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';

export interface ResultListItem {
    username: string;
    fullname: string;
    count: number;
    avatarUrl: string;
}

interface ResultListProps {
    items: ResultListItem[];
    firstHeaderButtonLabel: string;
    secondHeaderButtonLabel: string;
}

interface SortButton {
    order: OrderType;
    isActive: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grey: {
            color: "#0000008A"
        },
        disabled: {
            color: 'lightGrey'
        },
        wrapper: {
            marginTop: 10,
            display: 'flex',
            justifyContent: 'space-between'
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'center'
        },
        button: {
            // minWidth: 0,
            // paddingLeft: 0,
            // paddingRight: 0
        }
    }
    ))

const ResultList: React.FC<ResultListProps> = (props) => {

    const classes = useStyles();

    const [nameSortButton, setNameSortButton] = useState<SortButton>({ order: OrderType.ASC, isActive: false });
    const [countSortButton, setCountSortButton] = useState<SortButton>({ order: OrderType.ASC, isActive: false });

    const sortByName = (order: OrderType): ResultListItem[] => {
        return props.items.sort((item1, item2) => {
            if (item1.fullname > item2.fullname) {
                return 1 * order
            }

            if (item1.fullname < item2.fullname) {
                return -1 * order
            }

            return 0
        });
    };

    const sortByCount = (order: OrderType): ResultListItem[] => {
        return props.items.sort((item1, item2) => {
            if (item1.count > item2.count) {
                return 1 * order
            }

            if (item1.count < item2.count) {
                return -1 * order
            }

            return 0
        });
    }

    const applySortFilter = (): ResultListItem[] => {
        if (nameSortButton.isActive) {
            return sortByName(nameSortButton.order);
        }

        if (countSortButton.isActive) {
            return sortByCount(countSortButton.order);
        }

        return props.items;
    }

    const getArrowIcon = (buttonState: SortButton) => {
        return buttonState.order === OrderType.ASC ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
    }

    const handleNameSortButtonCLick = () => {
        if (nameSortButton.isActive) {
            if (nameSortButton.order === OrderType.ASC) {
                setNameSortButton({ ...nameSortButton, order: OrderType.DESC });
            }
            if (nameSortButton.order === OrderType.DESC) {
                setNameSortButton({ ...nameSortButton, order: OrderType.ASC });
            }
        } else {
            setNameSortButton({ ...nameSortButton, isActive: true });
            setCountSortButton({ ...countSortButton, isActive: false });
        }
    }

    const handleCountSortButtonCLick = () => {
        if (countSortButton.isActive) {
            if (countSortButton.order === OrderType.ASC) {
                setCountSortButton({ ...countSortButton, order: OrderType.DESC });
            }
            if (countSortButton.order === OrderType.DESC) {
                setCountSortButton({ ...countSortButton, order: OrderType.ASC });
            }
        } else {
            setCountSortButton({ ...nameSortButton, isActive: true });
            setNameSortButton({ ...countSortButton, isActive: false });
        }
    }

    return (
        <div>
            <div className={classes.wrapper}>
                <div className={classes.buttonContainer}>
                    <Button
                        className={clsx(classes.button, !nameSortButton.isActive && classes.disabled)}
                        onClick={handleNameSortButtonCLick}>
                        {props.firstHeaderButtonLabel}{getArrowIcon(nameSortButton)}
                    </Button>
                </div>
                <div>
                    <Button
                        className={clsx(classes.button, !countSortButton.isActive && classes.disabled)}
                        onClick={handleCountSortButtonCLick}>
                        {props.secondHeaderButtonLabel}{getArrowIcon(countSortButton)}
                    </Button>
                </div>
            </div>
            <List dense >
                {applySortFilter().map((item, idx) => (
                    <div key={idx}>
                        <ListItem>
                            <ListItemAvatar>
                                {item.avatarUrl ?
                                    <Avatar src={item.avatarUrl} /> :
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>}
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.username}
                                secondary={item.fullname}
                            />
                            <ListItemSecondaryAction classes={{ root: classes.grey }}>
                                {item.count}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>
        </div>
    )
}

export default ResultList;
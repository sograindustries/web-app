import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router';
import { ROUTE_HOME } from '../../App';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

interface Props {
    isOpen: boolean;
    onCloseClick: () => void;
}

function Drawer(props: Props) {
    const classes = useStyles();
    const history = useHistory();

    const handleOnHomeClick = () => {
        history.push(ROUTE_HOME);
    };

    return (
        <div>
            <SwipeableDrawer open={props.isOpen} onClose={props.onCloseClick} onOpen={() => {}}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={props.onCloseClick}
                    onKeyDown={props.onCloseClick}
                >
                    <List>
                        <ListItem button onClick={handleOnHomeClick}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Home'} />
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

export default Drawer;

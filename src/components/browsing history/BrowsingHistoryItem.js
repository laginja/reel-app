import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        height: 100,
        margin: '10px 5px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const BrowsingHistoryItem = ({ item }) => {
    const classes = useStyles();

    return (
        <Grid item xs={2}>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component={Link} to={`/audition/${item.id}`}>
                        {item.title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default BrowsingHistoryItem;
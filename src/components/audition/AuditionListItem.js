import React, { useContext, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { startRemoveAudition } from '../../actions/auditions';
import { startFetchUser } from '../../actions/users';
import usersReducer from '../../reducers/users';
import AuditionsContext from '../../context/audition-context';

// MUI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        margin: '10px 5px'
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


/**
 * for implementing infinite scroll we need to pass down the reference to the last component. This way we can tell when 
 * we have intersected with the last component so we can load more items
 */
const AuditionListItem = React.forwardRef(({ audition }, ref) => {
    /* get dispatchAuditions function from the AuditionsContext */
    const { dispatchAuditions } = useContext(AuditionsContext)
    /* get user that is logged-in */
    //const { currentUser } = useContext(AuthContext)

    const removeAudition = () => {
        startRemoveAudition(audition, dispatchAuditions)
    }

    const [owner, dispatchOwner] = useReducer(usersReducer, [])

    useEffect(() => {
        startFetchUser(audition.ownerId, dispatchOwner)
    }, [audition.ownerId])

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={3}>
            <div ref={ref}>
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {audition.category}
                        </Typography>
                        <Typography variant="h5" component={Link} to={`audition/${audition.id}`}>
                            {audition.title}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary" component={"p"}>
                            Posted by: <Link to={`user/${owner.uid}`}>{owner.displayName}</Link>
                        </Typography>
                        <Typography variant="body2" component="p">
                            {audition.description.substring(0, 20)}...
                    <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component={Link} to={`audition/${audition.id}`}>Learn More</Button>
                    </CardActions>
                    <CardActions>
                        <Button size="small" onClick={removeAudition}>X</Button>
                    </CardActions>
                </Card>
            </div>
        </Grid>
    )
})
export { AuditionListItem as default }
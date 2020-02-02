import React, { useContext } from 'react';
import AuditionListItem from './AuditionListItem';
import AuditionsContext from '../../context/audition-context';
import selectAuditions from '../../selectors/auditions';

// MUI
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    list: {
        'margin-bottom': 150
    }
});

const AuditionList = () => {
    const { auditions, filters } = useContext(AuditionsContext)
    /* get filtered Auditions */
    const auditionsFiltered = selectAuditions(auditions, filters)

    const classes = useStyles();

    return (
        <div>

        <Grid container className={classes.list}>
            {auditions.length === 0 ? (
                <p>0 auditions</p>
            ) : (
                auditionsFiltered.map((audition) => (
                    <AuditionListItem key={audition.id} audition={audition} />
                ))
            )}
        </Grid>
        </div>
    )
}
    
export default AuditionList;
import React, { useState, useEffect } from 'react';
import BrowsingHistoryItem from './BrowsingHistoryItem';
import History from '../../helpers/history';

// MUI
import Grid from '@material-ui/core/Grid';

const BrowsingHistory = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        let recentHistory = new History(JSON.parse(localStorage.getItem('history')))

        if (recentHistory)
            setHistory(recentHistory.reverse())
    }, [])

    const footer = {
        position: "fixed",
        bottom: "0",
        width: "100%",
        background: "#eaeaea"
    };

    return (
        <Grid container style={footer} direction="column">
            <Grid item xs={12}>
                <h3>Recently visited</h3>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="flex-start" alignItems="stretch">
                    {
                        history.map((item) => (
                            <BrowsingHistoryItem key={item.id} item={item} />
                        ))
                    }
                </Grid>
            </Grid>
        </Grid>

    )
}

export default BrowsingHistory;
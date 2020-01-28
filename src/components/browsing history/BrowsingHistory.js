import React, { useState, useEffect } from 'react';
import BrowsingHistoryItem from './BrowsingHistoryItem';
import History from '../../helpers/history';

const BrowsingHistory = () => {
    const [history, setHistory] = useState([])

    useEffect(() => {
        let recentHistory = new History(JSON.parse(localStorage.getItem('history')))

        if (recentHistory)
            setHistory(recentHistory.reverse())
    }, [])
    
    return (
        <div>
            {
                history.map((item) => (
                    <BrowsingHistoryItem key={item.id} item={item} />
                ))
            }
        </div>
    )
}

export default BrowsingHistory;
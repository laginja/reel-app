import React, { useState, useEffect } from 'react';
import AllAuditionsPage from './audition/AllAuditionsPage';
import AllPeoplePage from './user/AllPeoplePage';

const ReelsDashboardPage = () => {
    const [selection, setSelection] = useState('auditions');

    const [history, setHistory] = useState([])

    useEffect(() => {
        const recentHistory = JSON.parse(localStorage.getItem('history'))

        if (recentHistory)
            setHistory(recentHistory)
            console.log(recentHistory)
    }, [])
    
    return (
        <div className="content-main__item-wide">
            <div className="main__navigation">
                <h1>Browse</h1>
                <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                <button className="button" onClick={() => setSelection('people')}>People</button>
            </div>
            <div>
                { selection === 'auditions' ? <AllAuditionsPage /> : <AllPeoplePage />}    
            </div>
            {
                history.map((element) => {
                    return <p>{element}</p>
                })
            }
        </div>
        
    )
}

export default ReelsDashboardPage;
import React, { useState } from 'react';
import NoteApp from './NoteApp';

const Main = () => {
    const [selection, setSelection] = useState('auditions');
    return (
        <div className="main">
            <div className="main__navigation">
                <h1>Browse</h1>
                <button className="button" onClick={() => setSelection('auditions')}>Auditions</button>
                <button className="button" onClick={() => setSelection('people')}>People</button>
            </div>
            <div>
                { selection === 'auditions' ? <NoteApp /> : <div><h1>People component</h1></div>}    
            </div>
        </div>
    )
}

export default Main;
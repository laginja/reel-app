import React, { useContext, useState } from 'react';
import { setTextFilter } from '../actions/filters';
import AuditionsContext from '../context/audition-context';

const AuditionListFilters = () => {
    const { dispatchFilters } = useContext(AuditionsContext)

    /* creating a state for input text. This state will track the value for the input (makes this a controlled component)*/
    const [text, setText] = useState('')

    const handleTextChange = (e) => {
        setText(e.target.value)
        // we dispatch to the store and the change is immediately presented
        dispatchFilters(setTextFilter(e.target.value));
    }

    return (
        <div className="input-group">
            <div className="input-group__item">
                <input className="text-input" type="text" placeholder="Search auditions" value={text} onChange={handleTextChange}/>
            </div>
        </div>
    )
}

export default AuditionListFilters;
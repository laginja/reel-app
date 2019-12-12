import React, { useState, useContext } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import AuthContext from '../context/auth-context';
import CatInputs from './CatInputs';
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize' // imported to clear the error I was getting

const AuditionForm = (props) => {
    /* 
        'useState()' returns an array with 2 items -> 1st current state value that's gonna change over time, 
        2nd is a function we can call to update the state.

        'useState' uses 'useReducer' in the BG
    */
    /* get user that is logged-in */
    const { currentUser } = useContext(AuthContext)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createdAt, setCreatedAt] = useState(moment())
    const [category, setCategory] = useState('')
    const [auditionDate, setAuditionDate] = useState('') 
    const [calendarFocused, setCalendarFocus] = useState(false)
    const [location, setLocation] = useState('')  
    const [paid, setPaid] = useState(false) 
    const [error, setError] = useState('') 

    /* create state for crew members array */
    const blankCat = { name: '', age: '' };
    const [catState, setCatState] = useState([
        { ...blankCat },
    ]);

    const onDateChange = (auditionDate) => {
        if (auditionDate) {
            setAuditionDate(auditionDate)
        }       
    };

    const onFocusChange = ({focused}) => {
        setCalendarFocus(focused)
    };


    const addCat = () => {
        setCatState([...catState, { ...blankCat }]);
    };

    const handleCatChange = (e) => {
        e.preventDefault()
        const updatedCats = [...catState];
        updatedCats[e.target.dataset.idx][e.target.className] = e.target.value;
        setCatState(updatedCats);
    };

    const onSubmit = (e) => {
        e.preventDefault()

        const { uid } = currentUser;

        /* check for title and body */
        if (!title || !description) {
            setError('Please fill the form')
        } else {
            props.onSubmit({ 
                title: title, 
                description: description, 
                createdAt: createdAt.valueOf(),
                category: category,
                auditionDate: auditionDate.valueOf(), 
                location: location,
                paid: paid,
                crewMembers: catState, 
                ownerId: uid 
            })
            setTitle('')
            setDescription('')
            setCreatedAt('')
            setCategory('')
            setLocation('')
            setError('')
            setPaid(false)
            setAuditionDate('')
        }   
    };

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                { error && <p className="form__error">{error}</p>}
                <h3>General</h3>
                <input 
                    value={title} 
                    className="text-input"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    value={description} 
                    className="textarea"
                    placeholder="Audition Description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input 
                    value={category} 
                    className="text-input"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)} 
                />
                <SingleDatePicker
                    placeholder="Audition Date"
                    date={auditionDate}
                    onDateChange={onDateChange}
                    focused={calendarFocused}
                    onFocusChange={onFocusChange}
                    numberOfMonths={1}
                    block
                />
                <input 
                    value={location} 
                    className="text-input"
                    placeholder="Location"
                    onChange={(e) => setLocation(e.target.value)} 
                />
                <h3>Crew</h3>
                {
                    catState.map((val, idx) => (
                        <CatInputs
                            key={`cat-${idx}`}
                            idx={idx}
                            catState={catState}
                            handleCatChange={handleCatChange}
                        />
                    ))
                }
                <button className="button" onClick={addCat}>Add member</button>
                <input className="button button--add" type="submit" value="Add Audition" />
            </form>
        </div>
    )
}

export { AuditionForm as default }
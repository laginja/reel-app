import React, { useEffect, useState, useReducer, useContext } from 'react';
import { startFetchAudition, startEditAudition } from '../../actions/auditions';
import auditionsReducer from '../../reducers/auditions';
import AuthContext from '../../context/auth-context'
import Loading from '../Loading';
import AuditionForm from './AuditionForm';

const EditAuditionPage = (props) => {
    const {
        id: auditionId
    } = props.match.params

    // Get currently logged in user 
    const { currentUser } = useContext(AuthContext)

    // create states and provide dispatch function for the reducer to update that state
    const [audition, dispatchAudition] = useReducer(auditionsReducer, [])
    const [auditionLoaded, setAuditionLoaded] = useState(false)

    const isUserOwner = () => {
        if (currentUser.uid === audition.ownerId) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        startFetchAudition(auditionId, dispatchAudition).then(() => {
            setAuditionLoaded(true)
        })
    }, [auditionId])


    return (
        <div className="content-main__item-wide">
            <h3>Edit audition</h3>
            {!auditionLoaded ? <Loading /> : (
                // TODO: move this to Router
                !isUserOwner() ? (
                    // redirect to index
                    props.history.push(`/`)
                ) : (
                        <AuditionForm
                            audition={audition}
                            onSubmit={(audition) => {
                                startEditAudition(auditionId, audition)
                                props.history.push('/')
                            }} />
                    )
            )
            }
        </div>
    )
}

export default EditAuditionPage;
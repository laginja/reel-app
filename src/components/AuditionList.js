import React, { useContext } from 'react';
import Audition from './Audition';
import AuditionsContext from '../context/audition-context';
import selectAuditions from '../selectors/auditions';

const AuditionList = () => {
    const { auditions, filters } = useContext(AuditionsContext)
    /* get filtered Auditions */
    const auditionsFiltered = selectAuditions(auditions, filters)
    return (
        <div className="list-body">
            {auditions.length === 0 ? (
                <p>0 auditions</p>
            ) : (
                auditionsFiltered.map((audition) => (
                    <Audition key={audition.id} audition={audition} />
                ))
            )}
        </div>
    )
}
    
export default AuditionList;
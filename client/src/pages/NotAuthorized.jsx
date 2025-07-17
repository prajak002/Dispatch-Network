import React from 'react';
import { useHistory } from 'react-router-dom';

const NotAuthorized = () => {
    const history = useHistory();

    return (
        <div className="not-authorized">
            <h1>403</h1>
            <p>You do not have permission to access this resource.</p>
            <button 
                onClick={() => history.push('/dashboard')}
                className="back-btn"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default NotAuthorized;
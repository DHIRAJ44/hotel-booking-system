import React, { useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

function Loader() {
    let [loading, setLoading] = useState(true);
    return (
        <div style={loaderContainerStyle}>
            <div className='sweet-loading text-center'>
                <HashLoader color="#000" loading={loading} size={80} />
            </div>
        </div>
    );
}

const loaderContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
};

export default Loader;

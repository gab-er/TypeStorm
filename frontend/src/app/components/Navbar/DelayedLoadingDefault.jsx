import { useState, useEffect } from 'react';

const DelayedLoadingDefault = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => setShowSpinner(true), 2000);
  
      return () => clearTimeout(timer); // clean up on unmount
    }, []);
  
    return (
      <>
        {showSpinner && (
          <div className="select-none">
            Loading... 
          </div>
        )}
      </>
    );
  };

export default DelayedLoadingDefault
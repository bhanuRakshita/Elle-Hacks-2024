import React, {useState} from 'react';

const InputForm = () => {
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setendLocation] = useState('');
  return (
    <form style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '8px' }}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="starting-place" style={{ marginRight: '10px' }}>Choose a starting place</label>
        <input type="text" id="starting-place" placeholder="Enter a location" />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="destination" style={{ marginRight: '10px' }}>Choose destination</label>
        <input type="text" id="destination" placeholder="Enter a destination" />
      </div>
      <button type="submit">Get me there safe!</button>
    </form>
  );
};

export default InputForm;

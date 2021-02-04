import React, { useState, useEffect } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

const ColorPicker = (props) => {
  
  const [value, setValue] = useState(props.initialValue);
  const [displayColor, setDisplayColor] = useState(false);

  const handleOnChange = (color) => {
    setValue(color.hex);
  };

  const handleClick = () => {
    setDisplayColor(!displayColor);
  };

  const handleClose = () => {
    setDisplayColor(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      props.handleChange(props.field, value)
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value]);

    const styles = reactCSS({
      'default': {
        color: {
          background: `${ value }`,
        },
        swatch: {
          padding: '5px',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

  return (
    <div>
      <div style={ styles.swatch } onClick={ handleClick }>
        <div className="dot" style={ styles.color } />
      </div>
      { displayColor ? <div style={ styles.popover }>
        <div style={ styles.cover } onClick={ handleClose }/>
        <SketchPicker color={ value } onChange={ handleOnChange } />
      </div> : null }

    </div>
  )
  
}

export default ColorPicker
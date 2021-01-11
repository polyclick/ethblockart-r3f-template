import React, { useState } from 'react'
import ControlSlider from './ControlSlider'
import ControlColorPicker from './ControlColorPicker'
import './Sidebar.css'

const Sidebar = function (props) {

  const [isVisible, toggleVisibility] = useState(true)
  const handleToggleVisibility = () => {
    toggleVisibility(!isVisible)
  }

  const createModComponents = (mods) => {
    return mods.map(mod =>
      React.createElement(mod.id.includes(`color`) ? ControlColorPicker : ControlSlider, {
        key: mod.id,
        controlLabel: mod.id,
        modValue: mod.value,
        onChange: (e) => props.handleModChange(mod.id, e)
      })
    )
  }

  return (
    <div className={`sidebar ${isVisible ? "": "hidden"}`} >
      <div className="toggle-button" onClick={handleToggleVisibility}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.4 479.2"><path d="M382.4 479.2h102V0h-102v479.2zM338 239.6L206.1 126.3v64.9H0v97.9h206.1V353"/></svg>
      </div>

      <div className="section-header">Change Block</div>
      <div className="section-body">
        <ControlSlider
          modValue={props.blockNumber}
          modValueMin="1"
          modValueMax={props.blocks.length}
          modValueStep="1"
          onChange={(e) => { props.handleBlockChange(e) }}
        />
      </div>

      <div className="section-header">Change Style</div>
      <div className="section-body">
        { createModComponents(props.mods) }
        {<ControlColorPicker
          controlLabel="background"
          modValue={props.backgroundColor}
          onChange={(e) => { props.handleBackgroundChange(e) }}
        />}
      </div>

      <div className="section-header">Custom Attributes</div>
      <div className="section-body">
        {props.customAttribs.attributes ?
          props.customAttribs.attributes.map( (attribute, index) => {
            return <div className="custom-attribute" key={index}>
              <div className="content-header">{attribute.trait_type}</div>
              <div>{attribute.value}</div>
            </div>
          }) : ''}
      </div>
    </div>
  );
}
export default Sidebar;
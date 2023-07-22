import React from "react";
import SettingsContext from "../../context";

const Checkbox = ({ placehodler, name, label }) => {
  console.log("Test");

  return (
    <SettingsContext.Consumer>
      {({ settings, changeSettings }) => {
        return (
          <div className="fd-checkbox" style="background-color:red">
            <input
              className="fd-checkbox__input"
              type="checkbox"
              name={name}
              placeholder={placehodler}
              checked={settings[name]}
              onChange={changeSettings}
              id={name}
            />
            <label className="fd-checkbox__label" htmlFor={name}>
              {label}
            </label>
          </div>
        );
      }}
    </SettingsContext.Consumer>
  );
};

export default Checkbox;

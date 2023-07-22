import React from "react";

const SettingsContext = React.createContext({
  settings: {
    cssClass: "",
    labelpos: "top",
    ourlabel: ""
  },
  changeSettings: () => {}
});

export default SettingsContext;

import { useState } from "react";

export default function Request_Body({requestBody, setRequestBody, requestHeader, setRequestHeader, setParams}) {
  const [activePopup, setActivePopup] = useState(null);
  const [settings, setSettings] = useState({
    defaultUrl: "https://api.example.com",
    timeout: 5000,
  });

  const handleButtonClick = (popupType) => {
    setRequestBody(popupType);
    if (activePopup === popupType) {
      setActivePopup(null);
    } else {
      setActivePopup(popupType);
    }
  };

  function handleBody(e){
    setRequestBody(e.target.value)
  }

  function handleSettings(e){
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === "timeout" ? parseInt(value) : value
    }));
  }

  function handleParams(e){
    setParams(e.target.value)
  }

  function handleInputValue(e) {
    setRequestHeader(e.target.value);
  }

  const headerContent = (
      <div className="input-row">
        <input type="text" id="value" name="value" onChange={handleInputValue} />
      </div>
  );
  
  const bodyContent = (
    <div className="input-row">
      <input type="text" id="body" name="body" onChange={handleBody}  className="input-row"/>
    </div>
  );

  const settingsContent = (
    <div className="settings-row">
      <label htmlFor="defaultUrl">Default URL:</label>
      <input
        type="text"
        name="defaultUrl"
        value={settings.defaultUrl}
        onChange={handleSettings}
      />
      <label htmlFor="timeout">Request Timeout (ms):</label>
      <input
        type="number"
        name="timeout"
        value={settings.timeout}
        onChange={handleSettings}
      />
    </div>
  );

  const paramsContent = (
    <div className="input-row">
      <input type="text" id="body" name="body" onChange={handleParams}  className="input-row"/>
    </div>
  );

  return (
    <div className="request-body-container">
      <div className="request-body">
        <button onClick={() => handleButtonClick("header")}>header</button>
        <button onClick={() => handleButtonClick("params")}>params</button>
        <button onClick={() => handleButtonClick("body")}>body</button>
        <button onClick={() => handleButtonClick("settings")}>settings</button>
      </div>

      {activePopup && (
        <div className="popup">
          <p>{activePopup.toUpperCase()} </p>
          {activePopup =='header'? headerContent : ""}
          {activePopup =='params'? paramsContent : ""}
          {activePopup =='body'? bodyContent : ""}
          {activePopup =='settings'? settingsContent : ""}
        </div>
      )}

    </div>
  );
}
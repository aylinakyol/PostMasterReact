import { useState } from "react";

export default function Request_Body({requestBody, setRequestBody}) {
  const [activePopup, setActivePopup] = useState(null);

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

  const headerContent = (
    <div className="input-header">
      <div className="input-row">
        <label htmlFor="key">Key:</label>
        <input type="text" id="key" name="key" />
      </div>
      <div className="input-row">
        <label htmlFor="value">Value:</label>
        <input type="text" id="value" name="value" />
      </div>
    </div>
  );
  

  const bodyContent = (
    <div className="input-body">
      <input type="text" id="body" name="body" onChange={handleBody}/>
    </div>);

  return (
    <div className="request-body-container">
      <div className="request-body">
        <button onClick={() => handleButtonClick("header")}>header</button>
        <button onClick={() => handleButtonClick("params")}>params</button>
        <button onClick={() => handleButtonClick("body")}>body</button>
        <button onClick={() => handleButtonClick("auth")}>auth</button>
      </div>

      {activePopup && (
        <div className="popup">
          <p>{activePopup.toUpperCase()} content</p>
          {activePopup =='header'? headerContent : ""}
          {activePopup =='body'? bodyContent : ""}
        </div>
      )}
    </div>
  );
}
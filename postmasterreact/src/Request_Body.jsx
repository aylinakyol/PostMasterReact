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
        </div>
      )}
    </div>
  );
}
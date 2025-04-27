import { useState } from "react";

export default function Request_Body() {
  const [activePopup, setActivePopup] = useState(null);

  const handleButtonClick = (popupType) => {
    if (activePopup === popupType) {
      setActivePopup(null);
    } else {
      setActivePopup(popupType);
    }
  };

  return (
    <div className="request-body-container">
      <div className="request-body">
        <button onClick={() => handleButtonClick("header")}>Header</button>
        <button onClick={() => handleButtonClick("body")}>Body</button>
        <button onClick={() => handleButtonClick("auth")}>Auth</button>
      </div>

      {activePopup && (
        <div className="popup">
          <p>{activePopup.toUpperCase()} content</p>
        </div>
      )}
    </div>
  );
}
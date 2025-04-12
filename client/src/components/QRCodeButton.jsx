import React, { useState } from "react";
import QRCode from "react-qr-code";

const QRCodeButton = ({ url }) => {
  const [showQR, setShowQR] = useState(false);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setShowQR(!showQR)}
        className="mt-2 text-sm text-blue-600 underline"
      >
        {showQR ? "Hide QR Code" : "Show QR Code"}
      </button>

      {showQR && (
        <div className="mt-2 p-2 flex items-center justify-center bg-white rounded shadow">
          <QRCode value={url} size={100} />
        </div>
      )}
    </div>
  );
};

export default QRCodeButton;

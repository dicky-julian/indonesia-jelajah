import React from 'react';
import QrCodeGenerator from 'qrcode.react';

const QrCode = ({ value }) => (
  <QrCodeGenerator
    value={value}
    size={75}
  />
)

export default QrCode;
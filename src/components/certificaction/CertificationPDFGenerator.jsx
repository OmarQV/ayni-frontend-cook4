class CertificatePDFGenerator {
  generateCertificate(data) {
    const { certificate, userAddress, userData, downloadDate } = data;
    
    // Crear ventana para el PDF
    const printWindow = window.open('', '_blank');
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Certificado NFT - ${certificate.title}</title>
        <style>
          @page { 
            size: A4; 
            margin: 20mm; 
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }
          
          .certificate {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            border: 8px solid #16a085;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #16a085;
            padding-bottom: 20px;
          }
          
          .logo {
            font-size: 48px;
            margin-bottom: 10px;
          }
          
          .title {
            font-size: 32px;
            font-weight: bold;
            color: #16a085;
            margin: 0;
          }
          
          .subtitle {
            font-size: 18px;
            color: #666;
            margin: 10px 0;
          }
          
          .content {
            text-align: center;
            margin: 40px 0;
          }
          
          .certificate-text {
            font-size: 20px;
            margin-bottom: 30px;
            color: #2c3e50;
          }
          
          .user-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
            border-left: 5px solid #16a085;
          }
          
          .achievement {
            font-size: 28px;
            font-weight: bold;
            color: #e74c3c;
            margin: 20px 0;
            text-transform: uppercase;
          }
          
          .details-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
            text-align: left;
          }
          
          .detail-item {
            background: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
          }
          
          .detail-label {
            font-weight: bold;
            color: #16a085;
            display: block;
            margin-bottom: 5px;
          }
          
          .wallet-address {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            word-break: break-all;
            background: #34495e;
            color: white;
            padding: 10px;
            border-radius: 5px;
          }
          
          .footer {
            margin-top: 50px;
            text-align: center;
            border-top: 2px solid #bdc3c7;
            padding-top: 20px;
          }
          
          .qr-placeholder {
            width: 100px;
            height: 100px;
            background: #ecf0f1;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            font-size: 14px;
            color: #7f8c8d;
          }
          
          @media print {
            body { background: white; }
            .certificate { box-shadow: none; }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <!-- Header -->
          <div class="header">
            <div class="logo">🏆</div>
            <h1 class="title">CERTIFICADO NFT</h1>
            <p class="subtitle">Plataforma de Turismo Sostenible Ayni</p>
          </div>
          
          <!-- Content -->
          <div class="content">
            <p class="certificate-text">
              Se certifica que el usuario
            </p>
            
            <div class="user-info">
              <h2 style="margin: 0; color: #2c3e50;">${userData.name || 'Jhamil Calixto'}</h2>
              <p style="margin: 5px 0; color: #7f8c8d;">${userData.email || 'jhamil@example.com'}</p>
              <p style="margin: 5px 0; color: #7f8c8d;">${userData.role || 'Turista responsable'}</p>
            </div>
            
            <p class="achievement">
              ${certificate.title}
            </p>
            
            <p class="certificate-text">
              Ha completado exitosamente la experiencia turística en<br>
              <strong>${certificate.location}</strong>
            </p>
          </div>
          
          <!-- Details Grid -->
          <div class="details-grid">
            <div class="detail-item">
              <span class="detail-label">📍 Ubicación:</span>
              ${certificate.location}
            </div>
            
            <div class="detail-item">
              <span class="detail-label">📅 Fecha de Logro:</span>
              ${certificate.date}
            </div>
            
            <div class="detail-item">
              <span class="detail-label">🔗 Token ID:</span>
              ${certificate.tokenId}
            </div>
            
            <div class="detail-item">
              <span class="detail-label">🌍 Coordenadas:</span>
              ${certificate.coordinates}
            </div>
          </div>
          
          <!-- Wallet Address -->
          <div style="margin: 30px 0;">
            <span class="detail-label">🔐 Wallet Address:</span>
            <div class="wallet-address">${userAddress}</div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div class="qr-placeholder">
              QR Code<br>
              Blockchain
            </div>
            
            <p style="margin: 10px 0; color: #7f8c8d;">
              Certificado generado el ${downloadDate}<br>
              Verificable en la blockchain
            </p>
            
            <p style="margin: 20px 0; font-size: 14px; color: #95a5a6;">
              Este certificado NFT es una prueba inmutable de tu logro turístico<br>
              almacenada en la blockchain para verificación permanente
            </p>
            
            <div style="margin-top: 30px; color: #16a085; font-weight: bold;">
              🌱 Turismo Sostenible • 🔗 Blockchain Verified • 🏆 NFT Certificate
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
    
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Esperar a que cargue y abrir dialog de impresión
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }
}

export default CertificatePDFGenerator;
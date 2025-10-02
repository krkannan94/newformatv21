import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { Paths, File } from 'expo-file-system';
import { EntryFormData, ImageData } from '../types';
import { format } from 'date-fns';

export const generatePDF = async (
  formData: EntryFormData,
  allImages: ImageData[]
): Promise<string> => {
  const imagesHtml = allImages
    .map((img) => {
      const label = img.type === 'before' ? 'BEFORE' : img.type === 'after' ? 'AFTER' : 'UPLOAD';
      const labelColor = img.type === 'before' ? '#dc2626' : img.type === 'after' ? '#047857' : '#2563eb';

      return `
        <div style="page-break-inside: avoid; margin-bottom: 20px;">
          <div style="position: relative; width: 100%; max-width: 400px; margin: 0 auto;">
            <img src="${img.uri}" style="width: 100%; height: auto; border-radius: 8px; border: 2px solid #fff;" />
            <div style="position: absolute; top: 10px; left: 10px; background: ${labelColor}; color: white; padding: 4px 12px; border-radius: 4px; font-weight: bold; font-size: 12px;">
              ${label}
            </div>
            ${img.text ? `
              <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.95); padding: 8px 16px; border-radius: 8px; max-width: 80%; text-align: center;">
                ${img.text}
              </div>
            ` : ''}
          </div>
        </div>
      `;
    })
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          margin: 0;
          padding: 20px;
          background: #f9fafb;
        }
        .cover {
          background: linear-gradient(135deg, #047857 0%, #065f46 100%);
          color: white;
          padding: 60px 40px;
          border-radius: 12px;
          margin-bottom: 30px;
        }
        .cover h1 {
          margin: 0 0 40px 0;
          font-size: 32px;
          text-align: center;
        }
        .detail-row {
          display: flex;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .detail-label {
          font-weight: bold;
          min-width: 180px;
        }
        .detail-value {
          flex: 1;
        }
        .images-section {
          background: white;
          padding: 30px;
          border-radius: 12px;
        }
      </style>
    </head>
    <body>
      <div class="cover">
        <h1>CBRE Maintenance Report</h1>
        <div class="detail-row">
          <div class="detail-label">ACCOUNT:</div>
          <div class="detail-value">${formData.account}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">SITE:</div>
          <div class="detail-value">${formData.site}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">PM TASK NAME:</div>
          <div class="detail-value">${formData.pmTaskName}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">SERVICE PROVIDER:</div>
          <div class="detail-value">${formData.serviceProvider}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">SERVICED BY:</div>
          <div class="detail-value">${formData.serviceCompletedBy}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">DATE:</div>
          <div class="detail-value">${format(new Date(formData.dateOfMaintenance), 'MMMM dd, yyyy')}</div>
        </div>
      </div>

      <div class="images-section">
        <h2 style="text-align: center; color: #047857; margin-bottom: 30px;">Maintenance Images</h2>
        ${imagesHtml}
      </div>
    </body>
    </html>
  `;

  try {
    const { uri } = await printToFileAsync({
      html,
      base64: false,
    });

    return uri;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const downloadPDF = async (uri: string, filename: string) => {
  try {
    const file = new File(Paths.document, filename);
    const sourceFile = new File(uri);
    await sourceFile.copy(file);
    return file.uri;
  } catch (error) {
    console.error('PDF download failed:', error);
    throw error;
  }
};

export const sharePDF = async (uri: string) => {
  try {
    await shareAsync(uri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Share CBRE Report',
      UTI: 'com.adobe.pdf',
    });
  } catch (error) {
    console.error('PDF sharing failed:', error);
    throw error;
  }
};

import { playintegrity_v1, google } from 'googleapis';

export interface IntegrityVerdict {
  isValid: boolean;
  deviceIntegrity?: string[];
  appIntegrity?: string;
  error?: string;
}

export class IntegrityService {
  private playIntegrity: playintegrity_v1.Playintegrity;
  private packageName: string;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/playintegrity'],
    });

    this.playIntegrity = google.playintegrity({ version: 'v1', auth });
    this.packageName = process.env.GOOGLE_PLAY_PACKAGE_NAME || '';
  }

  async verifyToken(token: string): Promise<IntegrityVerdict> {
    if (!token) return { isValid: false, error: 'Token is required' };

    // Support for test/bypass mode if keys are not configured yet
    if (!process.env.GOOGLE_PRIVATE_KEY || process.env.INTEGRITY_BYPASS === 'true') {
      console.warn('Integrity check bypassed (Environment not configured or INTEGRITY_BYPASS is true)');
      return { isValid: true };
    }

    try {
      const res = await this.playIntegrity.v1.decodeIntegrityToken({
        packageName: this.packageName,
        requestBody: {
          integrityToken: token,
        },
      });

      const result = res.data.tokenPayloadExternal;
      const deviceIntegrity = result?.deviceIntegrity?.deviceRecognitionVerdict || [];
      const appIntegrity = result?.appIntegrity?.appRecognitionVerdict || undefined;

      // MEETS_DEVICE_INTEGRITY is the baseline check
      // Some devices might also meet MEETS_STRONG_INTEGRITY or MEETS_BASIC_INTEGRITY
      const isValid = deviceIntegrity.includes('MEETS_DEVICE_INTEGRITY') && 
                      appIntegrity === 'PLAY_RECOGNIZED';

      return {
        isValid,
        deviceIntegrity,
        appIntegrity,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error('Play Integrity Verification Error:', errorMessage);
      return { 
        isValid: false, 
        error: errorMessage
      };
    }
  }
}

export const integrityService = new IntegrityService();

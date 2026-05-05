import { GoogleAuth } from 'google-auth-library';

export class NotificationService {
  async sendNewWallpaperNotification(title: string, imageUrl: string, categorySlug: string, wallpaperId: string) {
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    // It's best to explicitly set FIREBASE_PROJECT_ID in your .env
    const projectId = process.env.FIREBASE_PROJECT_ID;

    if (!serviceAccountEmail || !privateKey || !projectId) {
      console.warn('Firebase credentials or FIREBASE_PROJECT_ID are missing in .env. Skipping FCM notification.');
      return;
    }

    try {
      const auth = new GoogleAuth({
        credentials: {
          client_email: serviceAccountEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
      });

      const accessToken = await auth.getAccessToken();

      // Ensure the topic doesn't have invalid characters
      const cleanTopic = categorySlug.replace(/[^a-zA-Z0-9-_.~%]/g, '');

      const payload = {
        message: {
          topic: `category_${cleanTopic}`,
          notification: {
            title: 'New Wallpaper Alert!',
            body: `A new wallpaper "${title}" was just added!`,
            image: imageUrl, // FCM supports image payloads directly
          },
          data: {
            type: 'new_wallpaper',
            category: categorySlug,
            wallpaper_id: wallpaperId,
            // To ensure the app can handle the background click intent directly
            click_action: "FLUTTER_NOTIFICATION_CLICK", 
          },
        },
      };

      const response = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('FCM Error:', JSON.stringify(errorData, null, 2));
      } else {
        console.log(`FCM Notification sent successfully to topic: category_${cleanTopic}`);
      }
    } catch (error) {
      console.error('Failed to send FCM notification:', error);
    }
  }
}

export const notificationService = new NotificationService();

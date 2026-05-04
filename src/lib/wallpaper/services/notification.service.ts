export class NotificationService {
  private readonly appId = process.env.ONESIGNAL_APP_ID;
  private readonly restApiKey = process.env.ONESIGNAL_REST_API_KEY;
  private readonly apiUrl = 'https://onesignal.com/api/v1/notifications';

  async sendNewWallpaperNotification(title: string, imageUrl: string, categorySlug: string, wallpaperId: string) {
    if (!this.appId || !this.restApiKey) {
      console.warn('OneSignal credentials are not set. Skipping notification.');
      return;
    }

    const payload = {
      app_id: this.appId,
      // Target users who are subscribed to this category's topic/tag
      // You can adjust this to send to all users if needed: included_segments: ['Subscribed Users']
      filters: [
        { field: 'tag', key: 'category', relation: '=', value: categorySlug },
      ],
      headings: { en: 'New Wallpaper Alert!' },
      contents: { en: `A new wallpaper "${title}" was just added to ${categorySlug}!` },
      big_picture: imageUrl,
      // Android specific
      android_channel_id: 'new_wallpapers',
      // Pass custom data to the app
      data: {
        type: 'new_wallpaper',
        category: categorySlug,
        wallpaper_id: wallpaperId,
      },
    };

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${this.restApiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OneSignal Error:', errorData);
      } else {
        console.log(`Notification sent successfully for ${title} to ${categorySlug}`);
      }
    } catch (error) {
      console.error('Failed to send OneSignal notification:', error);
    }
  }
}

export const notificationService = new NotificationService();

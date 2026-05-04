# Mobile App Integration Guide (OneSignal)

This guide explains how to configure your Flutter mobile app to receive push notifications when new wallpapers are uploaded, and how to deep-link users directly to the specific wallpaper when they tap the notification.

## 1. Add OneSignal to your Flutter Project

First, add the OneSignal Flutter SDK to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  onesignal_flutter: ^5.0.0 # Use the latest version
```

Run `flutter pub get` to install.

## 2. Initialize OneSignal

Initialize OneSignal as early as possible in your app's lifecycle, typically in your `main.dart`:

```dart
import 'package:onesignal_flutter/onesignal_flutter.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize OneSignal
  OneSignal.Debug.setLogLevel(OSLogLevel.verbose);
  OneSignal.initialize("YOUR_ONESIGNAL_APP_ID"); // Replace with your actual App ID
  
  // Request permission for iOS/Android 13+
  OneSignal.Notifications.requestPermission(true);

  runApp(const MyApp());
}
```

## 3. Subscribe to Categories (Tags)

The backend sends notifications based on tags. When a user is interested in a specific category (e.g., "cars"), or if your app is specifically built for a single category, you must tag the user device.

You can do this at app startup, or when a user selects their preferences:

```dart
// Example: The app is dedicated to the 'cars' category
OneSignal.User.addTagWithKey("category", "cars");

// Example: The user likes multiple categories
// In this case, you might need to adjust the backend to send to multiple topic tags,
// but for a 1-to-1 app-to-category mapping, the above works perfectly.
```

## 4. Handle Notification Clicks (Deep Linking)

When a notification is tapped, we extract the `wallpaper_id` from the custom data payload and navigate the user to the Wallpaper Details screen.

Add this setup in your `main.dart` or your main navigation widget:

```dart
void setupNotificationClickListener(BuildContext context) {
  OneSignal.Notifications.addClickListener((OSNotificationClickEvent event) {
    // Extract the custom data payload we send from the Next.js backend
    final data = event.notification.additionalData;
    
    if (data != null) {
      final String? type = data['type'];
      final String? wallpaperId = data['wallpaper_id'];
      
      // If this is a new wallpaper notification and we have the ID
      if (type == 'new_wallpaper' && wallpaperId != null) {
        
        print("Tapped on new wallpaper: $wallpaperId");
        
        // Navigate to the specific wallpaper using your router
        // Example using Navigator 2.0 / GoRouter:
        // context.go('/wallpaper/$wallpaperId');
        
        // Example using standard Navigator:
        /*
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (context) => WallpaperDetailScreen(wallpaperId: wallpaperId),
          ),
        );
        */
      }
    }
  });
}
```

## 5. Summary of the Backend Payload

For reference, this is the payload the backend sends to OneSignal. This helps you understand what is available in `event.notification.additionalData`:

```json
{
  "type": "new_wallpaper",
  "category": "cars",
  "wallpaper_id": "123e4567-e89b-12d3-a456-426614174000"
}
```

You can also access the image URL if needed: `event.notification.bigPicture`.

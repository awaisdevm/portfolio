# Mobile App Integration Guide (Firebase Cloud Messaging - FCM)

Since your backend sends push notifications directly through the Firebase v1 REST API, your Android app must use the official **Firebase Cloud Messaging** SDK.

## 1. Subscribing to Categories (Topics)

The backend sends notifications to specific "Topics" based on the category of the wallpaper. The format is `category_<slug>`. 

For example, if you upload a wallpaper to the "Cars" category, it sends a push notification to the topic `category_cars`.

You need to subscribe the Android app to this topic. You can do this when the user opens the app or selects their preferred categories:

```kotlin
import com.google.firebase.messaging.FirebaseMessaging

// Example: Subscribe the app to the 'cars' category topic
FirebaseMessaging.getInstance().subscribeToTopic("category_cars")
    .addOnCompleteListener { task ->
        var msg = "Subscribed to category_cars"
        if (!task.isSuccessful) {
            msg = "Subscribe failed"
        }
        println(msg)
    }
```

## 2. Handling Notification Taps (Deep Linking)

When the app is in the **background** and the user taps the FCM notification, the Android system automatically starts your Launcher Activity (`MainActivity`) and delivers the data payload inside the Activity's `Intent.extras`.

To navigate the user to the specific wallpaper, check for the `wallpaper_id` inside `onCreate` (and `onNewIntent` if your activity is `singleTop`):

```kotlin
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Check if Activity was launched from a notification tap
        handleNotificationIntent(intent)
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        // If MainActivity is already running and the user taps a notification
        handleNotificationIntent(intent)
    }

    private fun handleNotificationIntent(intent: Intent?) {
        val extras = intent?.extras ?: return

        // Extract the data sent from the backend
        val type = extras.getString("type")
        val wallpaperId = extras.getString("wallpaper_id")

        if (type == "new_wallpaper" && !wallpaperId.isNullOrEmpty()) {
            println("User tapped notification for Wallpaper ID: $wallpaperId")

            // Navigate to Wallpaper Detail Activity
            val detailIntent = Intent(this, WallpaperDetailActivity::class.java).apply {
                putExtra("WALLPAPER_ID", wallpaperId)
            }
            startActivity(detailIntent)
        }
    }
}
```

## 3. Handling Notifications while App is in the Foreground

If the app is currently open, the Android system will **not** show a visual popup by default. Instead, it passes the message to your `FirebaseMessagingService`.

If you want to handle it (e.g. show your own custom dialog or force a visual notification), override `onMessageReceived`:

```kotlin
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class MyFirebaseMessagingService : FirebaseMessagingService() {

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)

        // The data payload from our Next.js backend
        val data = remoteMessage.data
        val wallpaperId = data["wallpaper_id"]
        val category = data["category"]

        // The notification UI payload (Title, Body, Image)
        val title = remoteMessage.notification?.title
        val body = remoteMessage.notification?.body
        
        println("Foreground Notification Received! Wallpaper ID: $wallpaperId")
        
        // Handle it here (e.g., update a UI, or use NotificationManager to show a popup)
    }
    
    override fun onNewToken(token: String) {
        super.onNewToken(token)
        // Send token to backend if needed (not required for Topics)
    }
}
```

*Don't forget to register `MyFirebaseMessagingService` in your `AndroidManifest.xml`.*

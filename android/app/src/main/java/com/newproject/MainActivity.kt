package com.newproject

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import android.widget.Toast
import java.io.*
import java.net.HttpURLConnection
import java.net.URL

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "newproject"
  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      downloadBundleFile()
  }

  private fun downloadBundleFile() {
    Thread {
        try {
            val url = URL("https://bitlinks.bitsathy.ac.in/app/index.android.bundle")  // 🔁 Change to your domain
            val connection = url.openConnection() as HttpURLConnection
            connection.requestMethod = "GET"

            val input = BufferedInputStream(connection.inputStream)
            val file = File(applicationContext.filesDir, "index.android.bundle")
            val output = FileOutputStream(file)

            val data = ByteArray(1024)
            var count: Int
            while (input.read(data).also { count = it } != -1) {
                output.write(data, 0, count)
            }

            output.flush()
            output.close()
            input.close()

            runOnUiThread {
                Toast.makeText(this, "Please wait to update the latest version", Toast.LENGTH_SHORT).show()
                // Optionally restart app here
            }

        } catch (e: Exception) {
            e.printStackTrace()
        }
    }.start()
}



  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}

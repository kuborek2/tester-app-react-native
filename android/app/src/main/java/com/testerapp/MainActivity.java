package com.testerapp;

import com.facebook.react.ReactActivity;
// Splash screen imports
import com.facebook.react.ReactActivityDelegate; // <- add this necessary import
import com.zoontek.rnbootsplash.RNBootSplash; // <- add this necessary import

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "TesterApp";
  }

  // ----- Splash Screen --------
  // @Override
  //   protected void onCreate(Bundle savedInstanceState) {
  //   super.onCreate(savedInstanceState);
  //   RNBootSplash.init(MainActivity.this);
  // }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate(this, getMainComponentName()) {

      @Override
      protected void loadApp(String appKey) {
        RNBootSplash.init(MainActivity.this); // <- initialize the splash screen
        super.loadApp(appKey);
      }
    };
  }
}

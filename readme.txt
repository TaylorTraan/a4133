--Readme document for Taylor Tran, taylott3@uci.edu, 41158060, **ADD YOUR INFO**--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

*/10
- 1/1 The ability to log overnight sleep
- 1/1 The ability to log sleepiness during the day
- 1/1 The ability to view these two categories of logged data
- 2/2 Either using a native device resource or backing up logged data
- 2/2 Following good principles of mobile design
- 2/2 Creating a compelling app
- 1/1 A readme and demo video which explains how these features were implemented and their design rationale

2. How long, in hours, did it take you to complete this assignment?
5 hours



3. What online resources did you consult when completing this assignment? (list specific URLs)
https://ionicframework.com/docs/
https://www.med.upenn.edu/cbti/assets/user-content/documents/Stanford%20Sleepiness%20Scale.pdf


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
N/A, we worked on this ourselves.


5. Is there anything special we need to know in order to run your code?
Running ionic serve is good enough. 


--Aim for no more than two sentences for each of the following questions.--


6. Did you design your app with a particular type of user in mind? If so, whom?
Desgined the app with the intention of making it user-friendly and easy to understand.
Nothing too complicated so it promotes usage.


7. Did you design your app specifically for iOS or Android, or both?
We designed the app to work on both iOS and Android, using Ionic’s standard 
components so the layout and controls adapt to each platform.


8. How can a person log overnight sleep in your app? Why did you choose to support logging overnight sleep in this way?
Click a simple button when ready to go to sleep, then click the button again once you wake up.
We chose this so that users didn't need to manually log the time themselves, rather just click a simple button.


9. How can a person log sleepiness during the day in your app? Why did you choose to support logging sleepiness in this way?
Similar to how the person logs overnight except an additional button appears to choose a number 1-7
based on how sleepy they are, as sleepiness can vary by the day.


10. How can a person view the data they logged in your app? Why did you choose to support viewing logged data in this way?
They can view their data in a table that combines all their sleepiness data and overnight sleeping entries.
There's also a filter that can separate each of the datas.


11. Which feature choose--using a native device resource, backing up logged data, or both?
Backing up logged data.


12. If you used a native device resource, what feature did you add? How does this feature change the app's experience for a user?
N/A


13. If you backed up logged data, where does it back up to?
Backs up to localstorage so it stays with users across sessions.
Doesn't disappear unless user clears browser on-device site data.

14. How does your app implement or follow principles of good mobile design?
Has immediate notifications and responiveness when user interacts with app so they know what they're doing.
Uses a clear information hierarchy (simple title, short intro, and card-based sections). Provided pop ups to ensure users
confirmed they wanted to end the current sleep cycle as well (Avoids misclicks).


DEMO ANNOTATIONS

0:01 -  Demonstration of sleep tracker, initiated by "Start Overnight Sleep" button

0:20 - Ending the current sleep tracking with the "I'm Awake" Button. Also, shows a pop up 
to ensure the user confirms they are done with the sleep cycle and didn't misclick. Notification 
that sleep was logged shows up as well

0:25 - Latest Sleep cycle was stored in both the "All" and "Overnight" tabs

0:37 - Demonstration of sleepiness tracker initiated with "Log Sleepiness Now" button along with 
the buttons 1 - 7 for how sleepy they are.

0:42 - Notification that Sleepiness was logged. Latest Sleepiness shows in "Sleepiness" tab.

0:47 - Another Sleepiness example.

1:00 - Refresh page to show persistence of data in all three tabs.



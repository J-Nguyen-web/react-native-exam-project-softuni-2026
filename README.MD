## APK link:

Folder - https://github.com/J-Nguyen-web/react-native-exam-project-softuni-2026/releases/

File - https://github.com/J-Nguyen-web/react-native-exam-project-softuni-2026/releases/download/link/app-s2s.apk

**important notes** - THere is a hardcoded user if some problem with registration appear - **user: test@gmail.com password: 12345678**

There is 3 hardcoded sights, so it wont be need to create many sights to check how the types of scroll view works (scroll view may act strangely bcoz of the swipe to right pan gesture added for go back, but it works)

## React Native – Exam Project
### Functional Guide


**1.Project Overview**

* **Application Name:** Sight2Share

* **Application Category / Topic:** Traveling-Sightseeing-Tourism

**Main Purpose:**

Sight2Share provide a simple way to share travel expirience directly by opening the home screen and solves the problem of keeping track of visited or favorite places (future features). The app allows users to Browse and Discover interesting sights and landmarks. Authenticated users can create, edit (sight photo, location and descriptions) or delete their own sights.

---
**2.User Access & Permissions**

* Guest (Not Authenticated) - 
*cant use the app. The main goal of the app is users to start making photos and create records. Nowdays every person want to be a influencer so the main focus is to share.* 

* Authenticated User -
*can create (vie FormSightScreen), edit( again FormSightScreen via button in Details Screen) or delete (button in Details Screen) actions only for their sights (in future there will be like, rate and put in visit plan colection which will be visible on their profile). They can visit profile screen, where they can see sights created by them and logout button.*

---

**3.Authentication & Session Handling**

Authentication Flow
- When you press the icon and app start authentication logic start
- auth context check on mount if there is a user in the persistedState (stored in SecureStore) if exist user considered logged in and routed to the home screen.
- On registration user automaticly login (bcoz of the hasing password we need to make a fetch and then setItem in SecureStore and update AuthContext) considered that user is logged in home screen is open and ask about permission to use camera
- on logout the item stored in SecureStore is deleted, so the authChecking is triggered and the auth Screen is activated (other screens are not rendered)


**Session Persistence**

User session is stored in SecureStore only stringify object of a user (there was a problem with the token from json/profile и понеже ми е трети front-end курс всеки път се занимавам 80% със сървъра вместо със материала от курса искак да продължа по материала от курса)

Аutomatic login is handle by reading the user stored in SecureStore  on app initialization.

---

**4.Navigation Structure**
Root Navigation Logic

- Unauthenticated users are routed to AUthStack(Login / Register).
- Authenticated user are routed to MainTabs with acces to Sights and Profile screens.

Main Navigation
Main sections:

- Home (encouraging to create sight on spot with a camera only)
- Sights (FLatList of sights (in future to create sight by picking image from library))
- Profile (account info - using image picker to choose photo and button to users created sights (in future, liked, and svaed for visit sights))

Nested Navigation

- Stack Navigators inside Sight tab:
- Sight Detail ( its a root screen which makes it easy to access and used to show details from many screens ( searched filtered lists of sights, My Sights in profile screen and so on))
- FormSightScreen ( It can be use for edit and create and thats why is a root screen that can be easily reached. It can be call from Home when create, and details screen when edit (in future in SIghts Screen to upload photo from library))
---

**5.List → Details Flow**
List / Overview Screen

- Displays all sights with thumbnail, title, location, country and author.
(in future liked, rating, add to visit).
- Pull-to-refresh updates thelist dynamically from the API.

Details screen:
- Navigation triggered by tappin a sight card.
- Received id vie route.params to fetch full sight details from API or context.
- Shows images, title, location, description,  best time of the year to be visited, category and buttons edit/delete if its owner.
---

**6.Data Source & Backend**

Backend Type
- Real backed hosted on Render.com
- JSON-server-aut provides REST API endpoints with authentication
---

**7.Data Operations (CRUD)**

Read (GET)
- Fetched via sightService.getAll()for list (on Sights Screen)
- sightService.getById(id) for details (on Details Screen)

Create (POST)
- Authenticated users can create a sight via FormSightScreen.
- Image, title, description, country location are submitted to the API.
- react-hook-form validates the fields by schema-a.

Update / Delete (Mutation)
- Only owners can see the buttons and access the functionality
- Again via FormSightScreen which show different title for the button depending isEdit flag is boolean true.
- updateSight(id, data) updates sight information and navigate.goBack() to details screen. Using useFocusEffect callback re-fetch and update the edited sight.
- deleteSIghts(id) removes sight from API and updates UI using SightContext
- UI Refresh
- sList screen listen to SightProvider for automatic updates after CRUD (via refreshHandler and setRefresh)
---

**8.Forms & Validation**

Forms Used:
- Login / Register forms
- Create / Edit Sight form

Validation Rules:
- Email: required must be valid email format (react-hook-form has it own, no regex used, special keyboard with @ is used for the input)
- Password: Required, minimum 8 characters (securityTextEntry is used for the hidding letter in password input) 
- Sight title: Required, max 50 characters
- Sight descriptions: Required, at least 10 characters
- Optional: Country and location must not be empty
(in future location will fill that inputs automaticly if user use the feature)
---

**9.List all forms in the application:**

i just did that in 8.Forms & Validation or i missunderstood something else?

---

10. Native Device Features

Used Native Feature(s)

- Camera - used in FOrmSIghtScreen to capture a photo sights with live camera preview and attaches photo URI to sight
- Image Picker - used in profile for take-retake-update pictures from library or photos from user's phone
- DateTImePicker - used to choose best time of the year when to visit it show calendar from which you can choose a data.
- Picker - simiral to drop down menu, used for choosing options of categories.
---

**11. Typical User Flow**

- User opens the app - authCHeck start if the SecureStored user is the same, if not login or register the user setItemASync in SecureStore and Stack.Navigator gives access to the stack screens.
- Authenticated user may give permission camera to be used for creating photo sight - fills the form - submit - details of the sight appears with buttons for edit and delete the sight - user can edit or delete By press upper left corner back arrow can go back home

- Authenticated users can tab sights - from the list of sights user can tap any sights and see the Details Scree, only the owner will see buttons for edit/delete the sight
---

**12. Error & Edge Case Handling**

Atuhentication errors:
- Login/register failure shows alert with eerror message from API
- Network or data errors: API fetch errors display alert and maintain UI state EMpty or missing data state: EMpty list in My SIghts shows "No sights created yet." and navigation text to home Screen where user can create sight - Visit home to get started - press here.
- Sights have 3 hardcoded entries with navigation encouraging user to create his own sights.
- Image placeholder is used if photo is missing.
---

## Instalation Guide
Follow the steps below to set up and run the application locally
### 1. Clone the repository
```bash
git clone https://github.com/J-Nguyen-web/react-native-exam-project-softuni-2026.git
```
### 2.Install dependencies
Install required project dependencies.
```bash
npm install
```

### 3.Enviroment configuration
Create a `.env` file in the root directory of the project and add the following variable:
```
EXPO_PUBLIC_API_URL=https://react-native-api-3.onrender.com
```
This variable specifies the url of the deployed backend API used by the application.
### 4.Start the application
Run the expo development server:
```bash
npx expo start
```
### 5.run The app
after startin Expo, you can run application in one of the following ways:
* Scan the QR using expo go app on a mobile device
* Run on an ANdroid emulator
* Run in a Web browser
### 6.APK Instalation
if an APK build is provided, download the ark file and install it directly on an android devi to run the application without Expo.
### requirments
* Node.js(v18 or newer)
* nom
* Expo CLI
* Android device or emulator (for testing)
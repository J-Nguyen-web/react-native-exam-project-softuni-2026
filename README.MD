APK link:
https://github.com/J-Nguyen-web/react-native-exam-project-softuni-2026/releases/download/link/app-release.apk

React Native – Exam Project Functional Guide
1. Project Overview

Application Name: Sight2share

Application Category / Topic: Travel / Sightseeing

Main Purpose:
Sight2share allows users to browse and discover interesting sights and landmarks. Authenticated users can create, edit, and delete their own sightings, including photos and descriptions. The app solves the problem of keeping track of visited or favorite places, providing a simple way to share travel experiences.

2. User Access & Permissions

Guest (Not Authenticated)

Available screens or actions:

View the list of sights (SightScreen)

View sight details (DetailsSightScreen)

Pull-to-refresh list

Cannot create, edit, or delete sights

Authenticated User

Main sections / tabs:

Sights List (browse all sights)

Profile (view account info)

Create Sight (add new sight)

Details screens:

Sight Details (view full sight information, including images and description)

Create / Edit / Delete actions:

Create new sight via form (FormSightScreen)

Edit existing sight from DetailsSightScreen

Delete sight via button on DetailsSightScreen

3. Authentication & Session Handling

Authentication Flow:

On app start, the app checks AsyncStorage for a stored token.

If a token exists, the user is considered logged in and routed to the main app screens.

If no token is found, the user sees the login / register screens.

Successful login or registration stores the token and user info in AsyncStorage and updates the AuthContext.

Logout clears the token from storage and resets authentication state.

Session Persistence:

User session is stored using AsyncStorage (token key).

Automatic login is handled by reading the token from storage on app initialization.

4. Navigation Structure

Root Navigation Logic:

Unauthenticated users are routed to AuthStack (Login / Register).

Authenticated users are routed to MainTabs with access to sights and profile.

Main Navigation:

Main sections:

Sights (FlatList of sights)

Profile (account info)

Nested Navigation:

Stack Navigator inside Sights tab:

Sight Details

FormSightScreen (for creating or editing a sight)

5. List → Details Flow

List / Overview Screen:

Displays all sights with thumbnail, title, country, and city.

Pull-to-refresh updates the list dynamically from the API.

Details Screen:

Navigation triggered by tapping a sight card.

Receives id via route params to fetch full sight details from API or context.

Shows title, description, location, images, and edit/delete buttons if authenticated.

6. Data Source & Backend

Backend Type:

Real backend hosted on Render.com

JSON-server-auth provides REST API endpoints with authentication



7. Data Operations (CRUD)

Read (GET):

Fetched via sightService.getAll() for list

sightService.getById(id) for details

Create (POST):

Authenticated users can create a sight via FormSightScreen.

Image, title, description, country, city are submitted to the API.

Update / Delete (Mutation):

updateSight(id, data) updates sight information

deleteSight(id) removes sight from API and updates UI using SightContext

UI Refresh:

List screen listens to SightContext.sights for automatic updates after CRUD operations

8. Forms & Validation

Forms Used:

Login / Register forms

Create / Edit Sight form

Validation Rules:

Email: Required, must be valid email format

Password: Required, minimum 6 characters

Sight Title: Required, max 50 characters

Optional: Country and city must not be empty

9. Native Device Features

Used Native Feature(s):

Camera / Image Picker

Usage Description:

Used in FormSightScreen to capture or pick images for a sight

Provides live camera preview, retake option, and attaches photo URI to sight

10. Typical User Flow

User opens the app → automatic token check

Guest sees list of sights → taps sight → views details

Authenticated user → taps “+” to create sight → fills form → submits → sight appears in list

Authenticated user → taps sight → edits or deletes sight

11. Error & Edge Case Handling

Authentication errors: Login/register failure shows alert with error message from API

Network or data errors: API fetch errors display alert and maintain UI state

Empty or missing data states: Empty list shows “No sights available”; image placeholder used if photo missing

// keyboard avoiding and for email with @
// expo-file-system installed (shouldnt be used)
// image picker installed
// refresh sight list on swripe down
// register navigation goBack
// auth and no other screens until register
// auto login
// button prevent double saving

//npm remove json-server and json-server-auth

"server": "json-server --watch db.json --host 0.0.0.0 --port 3000"

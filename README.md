# Sportify - Sports & Lifestyle Mobile App

A comprehensive React Native mobile application built with Expo CLI for viewing sports teams, matches, players, and scores. Features user authentication, favorites management, and dark mode support.

## 🏆 Features

### Core Functionality
- ✅ **User Authentication**: Login and registration with form validation using Yup
- ✅ **Dynamic Home Screen**: Display sports teams from TheSportsDB API with search functionality
- ✅ **Team Details**: View comprehensive team information including stadium, history, and social links
- ✅ **Favorites Management**: Add/remove teams from favorites with persistent storage
- ✅ **Dark Mode**: Toggle between light and dark themes with preferences saved locally
- ✅ **Responsive Design**: Clean UI with Feather Icons and responsive layouts

### Technical Implementation
- **State Management**: Redux Toolkit for global state
- **Navigation**: React Navigation with Stack and Bottom Tab navigators
- **Data Persistence**: Expo SecureStore for auth tokens, AsyncStorage for favorites
- **Form Validation**: Formik + Yup for robust form handling
- **API Integration**: TheSportsDB API for sports data, DummyJSON for authentication

## 📱 Screenshots

The app includes:
- Login/Registration screens with validation
- Home screen with searchable team list
- Detailed team view with social media links
- Favorites screen with persistent storage
- Profile screen with dark mode toggle

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for testing on physical device)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Sportify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android) or Camera app (iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator (macOS only)
   - Press `w` for web browser

## 🔑 Demo Credentials

For testing the login functionality:
- **Username**: `emilys`
- **Password**: `emilyspass`

## 📁 Project Structure

```
Sportify/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   └── LoadingSpinner.js
│   ├── constants/          # App constants and configuration
│   │   ├── api.js
│   │   └── colors.js
│   ├── context/            # React Context providers
│   │   └── ThemeContext.js
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.js
│   │   ├── BottomTabNavigator.js
│   │   ├── HomeStack.js
│   │   └── FavoritesStack.js
│   ├── redux/              # Redux state management
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── favoritesSlice.js
│   │   │   └── sportsSlice.js
│   │   └── store.js
│   ├── screens/            # App screens
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   ├── HomeScreen.js
│   │   ├── DetailsScreen.js
│   │   ├── FavoritesScreen.js
│   │   └── ProfileScreen.js
│   ├── services/           # API services
│   │   ├── authService.js
│   │   └── sportsService.js
│   └── utils/              # Utility functions
│       ├── storage.js
│       └── validation.js
├── App.js                  # App entry point
├── app.json               # Expo configuration
└── package.json           # Dependencies
```

## 🔧 Technologies Used

### Core
- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Redux Toolkit** - State management
- **React Redux** - Redux bindings for React

### UI & Styling
- **@expo/vector-icons** - Feather icons
- **React Native Safe Area Context** - Safe area handling
- **React Native Screens** - Native screen optimization

### Forms & Validation
- **Formik** - Form management
- **Yup** - Schema validation

### Storage
- **Expo SecureStore** - Secure storage for auth tokens
- **AsyncStorage** - Local data persistence

### APIs
- **TheSportsDB API** - Sports data
- **DummyJSON** - Mock authentication

## 🎯 Key Features Implementation

### Authentication
- Secure token storage using Expo SecureStore
- Form validation with Yup schemas
- Persistent login state
- Mock registration flow

### State Management
- Redux Toolkit for efficient state updates
- Separate slices for auth, sports, and favorites
- Middleware configuration for async operations

### Navigation
- Stack navigation for screen hierarchy
- Bottom tabs for main app sections
- Conditional rendering based on auth state

### Data Persistence
- Favorites saved to AsyncStorage
- Theme preference persistence
- Auth tokens in SecureStore

### API Integration
- TheSportsDB for real sports data
- Error handling and loading states
- Search functionality

## 📝 Best Practices Implemented

1. **Code Organization**: Feature-based folder structure
2. **Reusable Components**: Modular, testable components
3. **Type Safety**: Proper prop validation
4. **Error Handling**: Try-catch blocks and user feedback
5. **Performance**: Memoization and optimized rendering
6. **Security**: Secure storage for sensitive data
7. **UX**: Loading states, error messages, and smooth navigation
8. **Accessibility**: Proper touch targets and readable text

## 🌙 Dark Mode

The app features a complete dark mode implementation:
- Toggle in Profile screen
- Persists across app restarts
- Smooth theme transitions
- Consistent color scheme

## 🔄 State Management Flow

```
User Action → Dispatch Action → Reducer → Update State → Re-render Component
```

### Example: Adding to Favorites
1. User taps heart icon on team card
2. `addFavorite` action dispatched
3. Redux reducer updates favorites array
4. AsyncStorage saves updated favorites
5. UI reflects new favorite state

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS simulator not opening**
   - Ensure Xcode and Command Line Tools are installed
   - Check Xcode > Preferences > Locations

3. **Android emulator connection**
   - Enable USB debugging
   - Check ADB connection: `adb devices`

## 📱 Building for Production

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

## 🤝 Contributing

This is a project submission for a mobile development assignment. For contributions:
1. Fork the repository
2. Create a feature branch
3. Commit changes with descriptive messages
4. Push to your fork
5. Create a pull request

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as part of a React Native mobile development assignment focusing on:
- Modern React Native development practices
- State management with Redux
- RESTful API integration
- User authentication flows
- Persistent data storage
- Responsive UI design

## 🙏 Acknowledgments

- **TheSportsDB** - Sports data API
- **DummyJSON** - Mock authentication API
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Feather Icons** - Icon library

---

**Version**: 1.0.0  
**Built with**: React Native, Expo, Redux Toolkit, React Navigation

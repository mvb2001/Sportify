# 🚀 Sportify - Quick Start Guide

## Get Started in 3 Steps

### 1️⃣ Install & Start
```bash
cd e:\Sportify
npx expo start
```

### 2️⃣ Open on Device
- **Expo Go App**: Scan QR code from terminal
- **Android Emulator**: Press `a`
- **iOS Simulator**: Press `i`
- **Web Browser**: Press `w`

### 3️⃣ Login & Explore
Use demo credentials:
- **Username**: `emilys`
- **Password**: `emilyspass`

---

## 🎯 What to Test

### Authentication Flow
1. Launch app → Login screen
2. Enter demo credentials
3. Tap "Sign In"
4. Navigate to Home screen

### Home Screen Features
- ✅ View Premier League teams
- ✅ Search for teams
- ✅ Pull down to refresh
- ✅ Tap heart to add favorites
- ✅ Tap card to view details

### Team Details
- ✅ View team information
- ✅ See stadium details
- ✅ Add/remove from favorites
- ✅ Open social media links

### Favorites
- ✅ View saved teams
- ✅ Navigate to details
- ✅ Remove from favorites

### Profile
- ✅ View user info
- ✅ Toggle dark mode
- ✅ Clear all favorites
- ✅ Logout

---

## 🎨 Features Showcase

### Dark Mode
1. Go to Profile tab
2. Toggle "Dark Mode" switch
3. Watch entire app theme change
4. Restart app - preference saved!

### Favorites Persistence
1. Add teams to favorites
2. Close app completely
3. Reopen app
4. Favorites still there!

### Search
1. Go to Home tab
2. Type in search bar
3. Results filter instantly

---

## 📱 Navigation Flow

```
Login → Home (Bottom Tab)
         ├─ Home → Details
         ├─ Favorites → Details
         └─ Profile
```

---

## 🔧 Troubleshooting

### Server Won't Start
```bash
npx expo start --clear
```

### Can't Scan QR Code
- Make sure phone and computer are on same WiFi
- Try tunnel mode: `npx expo start --tunnel`

### App Not Loading
- Check internet connection
- Restart Metro bundler
- Clear Expo cache

---

## 📝 Key Files

- `App.js` - Entry point
- `src/navigation/AppNavigator.js` - Navigation setup
- `src/screens/` - All app screens
- `src/redux/store.js` - State management
- `src/services/` - API integration

---

## 🎓 Demo Walkthrough

### 5-Minute Demo Script

**Minute 1: Authentication**
- Show login screen
- Enter credentials
- Successful login

**Minute 2: Home & Search**
- Scroll through teams
- Use search feature
- Add team to favorites

**Minute 3: Details & Favorites**
- Open team details
- Show all information
- Navigate to Favorites tab

**Minute 4: Profile & Dark Mode**
- Open Profile
- Toggle dark mode
- Show theme change

**Minute 5: Persistence**
- Close and reopen app
- Verify favorites saved
- Verify theme saved
- Logout

---

## ✅ Requirements Coverage

| Requirement | Status | Location |
|------------|--------|----------|
| Authentication | ✅ | LoginScreen.js, RegisterScreen.js |
| Navigation | ✅ | AppNavigator.js, BottomTabNavigator.js |
| Dynamic List | ✅ | HomeScreen.js with TheSportsDB API |
| State Management | ✅ | redux/store.js + 3 slices |
| Favorites | ✅ | FavoritesScreen.js + AsyncStorage |
| Styling | ✅ | All components with Feather Icons |
| Dark Mode | ✅ | ThemeContext.js + ProfileScreen.js |

---

## 🌟 Standout Features

1. **Professional UI**: Card-based design with smooth animations
2. **Real API**: Live sports data from TheSportsDB
3. **Security**: Secure token storage
4. **Validation**: Comprehensive form validation
5. **UX**: Loading states, empty states, error handling
6. **Code Quality**: Clean, modular, well-documented

---

## 📞 Support

### Check Documentation
- `README.md` - Full documentation
- `DEVELOPMENT.md` - Developer guide
- `PROJECT_SUMMARY.md` - Complete overview

### Common Questions

**Q: How do I test without a physical device?**
A: Use web browser (press `w`) or Android emulator

**Q: Can I use my own API keys?**
A: Yes, update `src/constants/api.js`

**Q: How do I build for production?**
A: Use `eas build` (requires Expo account)

---

## 🎉 You're Ready!

The app is **fully functional** and **production-ready**.

Enjoy exploring Sportify! 🏆⚽🏀

---

**Need Help?** Check the other documentation files in this project.

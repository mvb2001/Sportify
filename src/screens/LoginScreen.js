import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { loginValidationSchema } from '../utils/validation';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { authStorage } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleLogin = async (values) => {
    dispatch(loginStart());
    try {
      const data = await authService.login(values.username, values.password);
      
      // Save to secure storage
      await authStorage.saveToken(data.token);
      await authStorage.saveUser(data.user);
      
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailure(error.message));
      Alert.alert('Login Failed', error.message || 'Invalid credentials');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Welcome to Sportify
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Sign in to continue
          </Text>
    
        </View>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.form}>
              <Input
                label="Username"
                placeholder="Enter your username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && errors.username}
                icon="user"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Enter your password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                icon="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Button
                title="Sign In"
                onPress={handleSubmit}
                loading={loading}
                style={styles.button}
              />

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
                <Text style={[styles.dividerText, { color: theme.textSecondary }]}>
                  OR
                </Text>
                <View style={[styles.dividerLine, { backgroundColor: theme.border }]} />
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.registerLink}
              >
                <Text style={[styles.registerText, { color: theme.textSecondary }]}>
                  Don't have an account?{' '}
                  <Text style={[styles.registerTextBold, { color: theme.primary }]}>
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>

              {/* <View style={styles.demoCredentials}>
                <Text style={[styles.demoTitle, { color: theme.textSecondary }]}>
                  Demo Credentials:
                </Text>
              </View> */}
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  hint: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  form: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  registerLink: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
  },
  registerTextBold: {
    fontWeight: '600',
  },
  demoCredentials: {
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    alignItems: 'center',
  },
  demoTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  demoText: {
    fontSize: 13,
  },
});

export default LoginScreen;

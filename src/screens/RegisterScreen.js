import React from 'react';
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
import { registerValidationSchema } from '../utils/validation';
import {
  registerStart,
  registerSuccess,
  registerFailure,
} from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { authStorage } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import Input from '../components/Input';
import Button from '../components/Button';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleRegister = async (values) => {
    dispatch(registerStart());
    try {
      const data = await authService.register({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        username: values.username,
        password: values.password,
      });

      // Save to secure storage
      await authStorage.saveToken(data.token);
      await authStorage.saveUser(data.user);

      dispatch(registerSuccess(data));
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      dispatch(registerFailure(error.message));
      Alert.alert('Registration Failed', error.message || 'Please try again');
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
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Sign up to get started
          </Text>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={registerValidationSchema}
          onSubmit={handleRegister}
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
                label="First Name"
                placeholder="Enter your first name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName}
                icon="user"
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName}
                icon="user"
              />

              <Input
                label="Email"
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                icon="mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Username"
                placeholder="Choose a username"
                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                error={touched.username && errors.username}
                icon="at-sign"
                autoCapitalize="none"
              />

              <Input
                label="Password"
                placeholder="Create a password"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password}
                icon="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                icon="lock"
                secureTextEntry
                autoCapitalize="none"
              />

              <Button
                title="Sign Up"
                onPress={handleSubmit}
                loading={loading}
                style={styles.button}
              />

              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.loginLink}
              >
                <Text style={[styles.loginText, { color: theme.textSecondary }]}>
                  Already have an account?{' '}
                  <Text style={[styles.loginTextBold, { color: theme.primary }]}>
                    Sign In
                  </Text>
                </Text>
              </TouchableOpacity>
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
    paddingTop: 40,
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
  form: {
    width: '100%',
  },
  button: {
    marginTop: 8,
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    fontSize: 14,
  },
  loginTextBold: {
    fontWeight: '600',
  },
});

export default RegisterScreen;

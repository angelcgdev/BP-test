import React, { useContext, useEffect } from 'react';
import { FinancialProductsView } from './src/modules/financial_products/ui/views/FinancialProductsView';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinancialProductDetailsView } from './src/modules/financial_products/ui/views/FinancialProductDetailsView';
import { ThemeContext, ThemeProvider } from './src/modules/common/components/ThemeProvider';
import { FinancialProductCreateView } from './src/modules/financial_products/ui/views/FinancialProductCreateView';
import { BPHeader } from './src/modules/financial_products/ui/components/BPHeader';
import { FinancialProductsProvider } from './src/modules/financial_products/ui/components/FinancialProductsProvider';
import { FinancialProductEditView } from './src/modules/financial_products/ui/views/FinancialProductEditView';
import { RepositoryProvider } from './src/modules/common/components/RepositoryProvider';
import Snackbar from './src/modules/common/components/BPSnackbar';
import { SnackbarProvider } from './src/modules/common/components/SpackbarProvider';


const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  Create: undefined;
  Edit: undefined;
};

function AppRouter() {
  const { colors } = useContext(ThemeContext);
  return (
    <NavigationContainer theme={{ ...DefaultTheme, dark: false }}>
      <Stack.Navigator screenOptions={{ header: () => <BPHeader />, contentStyle: { backgroundColor: colors.background }, statusBarColor: colors.background, statusBarStyle: 'dark' }}>
        <Stack.Screen
          name="Home"
          component={FinancialProductsView}
        />
        <Stack.Screen
          name="Details"
          component={FinancialProductDetailsView}
          options={{
            header: () => < BPHeader canGoback />
          }}
        />
        <Stack.Screen
          name="Create"
          component={FinancialProductCreateView}
          options={{
            header: () => < BPHeader canGoback />
          }}
        />
        <Stack.Screen
          name="Edit"
          component={FinancialProductEditView}
          options={{
            header: () => < BPHeader canGoback />
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
function App(): JSX.Element {

  return (
    <RepositoryProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <FinancialProductsProvider>
            <AppRouter />
            <Snackbar />
          </FinancialProductsProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </RepositoryProvider>
  );
}

export default App;

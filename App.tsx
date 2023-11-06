import React, { useContext } from 'react';
import { FinancialProductsView } from './src/modules/financial_products/ui/views/FinancialProductsView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FinancialProductDetailsView } from './src/modules/financial_products/ui/views/FinancialProductDetailsView';
import { ThemeContext, ThemeProvider } from './src/modules/common/components/ThemeProvider';
import { FinancialProduct } from './src/modules/financial_products/domain/entities/financialProduct';
import { FinancialProductCreateView } from './src/modules/financial_products/ui/views/FinancialProductCreateView';
import { BPHeader } from './src/modules/financial_products/ui/components/BPHeader';
import { Text } from 'react-native';
import { FinancialProductsProvider } from './src/modules/financial_products/ui/components/FinancialProductsProvider';


const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Home: undefined;
  Details: { product: FinancialProduct };
  Create: undefined;
};

function AppRouter() {
  const { colors } = useContext(ThemeContext);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ header: () => <BPHeader />, contentStyle: { backgroundColor: colors.background } }}>
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}
function App(): JSX.Element {

  return (
    <ThemeProvider>
      <FinancialProductsProvider>
        <AppRouter />
      </FinancialProductsProvider>
    </ThemeProvider>
  );
}

export default App;

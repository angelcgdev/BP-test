import { renderHook, act, waitFor } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';
import { useFinantialProductCreate } from '../../../../../src/modules/financial_products/aplication/useFinantialProductCreate';
import { successMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/successMockProductsRepositoryImpl';

describe('useFinantialProductCreate', () => {
  const successMockProductsRepository = new successMockProductsRepositoryImpl();
  it('debe validar que el ID sea mayor o igual a 3 y menor o igual a 10', async () => {
    const { result } = renderHook(() => useFinantialProductCreate({ productRepository: successMockProductsRepository }));
    const { actions, state } = result.current;

    act(() => {
      actions.handleChange('id', 'abc');
    });
    await waitFor(() => {
      expect(state.errors.id).toBe('');
    });

    act(() => {
      actions.handleChange('id', 'ab');
    });

    await waitFor(() => {
      expect(state.errors.id).toBe('ID no válido!');

    });

    act(() => {
      actions.handleChange('id', 'abcdefghijk');
    });

    await waitFor(() => {
      expect(state.errors.id).toBe('ID no válido!');
    });
  });

  it('debe validar que la fecha de liberación sea mayor o igual a la fecha de hoy', () => {
    const { result } = renderHook(() => useFinantialProductCreate({ productRepository: successMockProductsRepository }));
    const { actions, state } = result.current;

    const today = new Date();

    act(() => {
      actions.handleChange('date_release', today);
    });

    expect(state.errors.date_release).toBe('');

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    act(() => {
      actions.handleChange('date_release', yesterday);
    });

    expect(state.errors.date_release).toBe('Fecha liberación no válida!');
  });

  it('debe validar que la fecha de revisión sea un año después de la fecha de liberación', () => {
    const { result } = renderHook(() => useFinantialProductCreate({ productRepository: successMockProductsRepository }));
    const { actions, state } = result.current;

    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setFullYear(today.getFullYear() + 1);

    act(() => {
      actions.handleChange('date_release', today);
      actions.handleChange('date_revision', futureDate);
    });

    expect(state.errors.date_revision).toBe('');

    act(() => {
      actions.handleChange('date_revision', today);
    });

    expect(state.errors.date_revision).toBe('Fecha revisión no válida!');
  });
});

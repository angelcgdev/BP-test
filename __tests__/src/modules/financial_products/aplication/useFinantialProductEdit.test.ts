import { renderHook, act, waitFor } from '@testing-library/react-native';
import { it, describe, expect } from '@jest/globals';
import { successMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/successMockProductsRepositoryImpl';
import { useFinantialProductEdit } from '../../../../../src/modules/financial_products/application/useFinantialProductEdit';
import { financialProducts } from '../../../../../src/modules/financial_products/infraestructure/datasources/local/db';
import { errorMockProductsRepositoryImpl } from '../../../../../src/modules/financial_products/infraestructure/repositories/errorMockProductsRepositoryImp';

describe('useFinantialProductEdit', () => {
  const productSelected = financialProducts[0];

  it('debe inicializar el estado correctamente', () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));
    expect(result.current.state.form).toBe(productSelected);
  });
  it('debe validar que el ID tenga de 3 y hasta 10 digitos', async () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));
    act(() => {
      result.current.actions.handleChange('id', 'abc');
    });
    await waitFor(() => {
      expect(result.current.state.form.id).toEqual('abc');
    });

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.id).toEqual('');
    });

    act(() => {
      result.current.actions.handleChange('id', 'ab');
    });

    await waitFor(() => {
      expect(result.current.state.form.id).toEqual('ab');
    });
    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.id).toEqual('ID no válido!');
    });

    act(() => {
      result.current.actions.handleChange('id', 'abcdefghijk');
    });

    await waitFor(() => {
      expect(result.current.state.form.id).toEqual('abcdefghijk');
    });

    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.id).toBe('ID no válido!');
    });
  });

  it('debe validar que el Nombre tenga de 5 y hasta 100 digitos', async () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));
    act(() => {
      result.current.actions.handleChange('name', 'abcde');
    });
    await waitFor(() => {
      expect(result.current.state.form.name).toEqual('abcde');
    });

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.name).toEqual('');
    });

    act(() => {
      result.current.actions.handleChange('name', 'abcd');
    });

    await waitFor(() => {
      expect(result.current.state.form.name).toEqual('abcd');
    });
    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.name).toEqual('Nombre no válido!');
    });
    const inputWith101Characteres = 'abcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkaa';
    act(() => {
      result.current.actions.handleChange('name', inputWith101Characteres);
    });

    await waitFor(() => {
      expect(result.current.state.form.name).toEqual(inputWith101Characteres);
    });
    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.name).toBe('Nombre no válido!');
    });
  });

  it('debe validar que la Descripción tenga de 10 y hasta 200 digitos', async () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));
    act(() => {
      result.current.actions.handleChange('description', 'abcdefghij');
    });
    await waitFor(() => {
      expect(result.current.state.form.description).toEqual('abcdefghij');
    });

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.description).toEqual('');
    });

    act(() => {
      result.current.actions.handleChange('description', 'abcdefghi');
    });

    await waitFor(() => {
      expect(result.current.state.form.description).toEqual('abcdefghi');
    });
    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.description).toEqual('Descripción no válida!');
    });
    const inputWith201Characteres = 'abcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkaabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkap';
    act(() => {
      result.current.actions.handleChange('description', inputWith201Characteres);
    });

    await waitFor(() => {
      expect(result.current.state.form.description).toEqual(inputWith201Characteres);
    });
    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.description).toBe('Descripción no válida!');
    });
  });

  it('debe validar que el Logo no este vacio', async () => {

    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));
    act(() => {
      result.current.actions.handleChange('logo', 'a');
    });
    await waitFor(() => {
      expect(result.current.state.form.logo).toEqual('a');
    })

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.logo).toBe('');
    })

    act(() => {
      result.current.actions.handleChange('logo', '');
    });
    await waitFor(() => {
      expect(result.current.state.form.logo).toEqual('');
    })

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.logo).toBe('Logo es requerido!');
    })
  });

  it('debe validar que la fecha de liberación sea mayor o igual a la fecha de hoy', async () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));

    const today = new Date();

    act(() => {
      result.current.actions.handleChange('date_release', today);
    });

    await waitFor(() => {
      expect(result.current.state.form.date_release).toBe(today);
    });

    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.errors.date_release).toEqual('');
    });


    let yesterday = new Date(today);
    yesterday.setUTCDate(today.getUTCDate() - 1);

    act(() => {
      result.current.actions.handleChange('date_release', yesterday);
    });
    await waitFor(() => {
      expect(result.current.state.form.date_release).toBe(yesterday);
    });

    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.date_release).toEqual('Fecha liberación no válida!');
    });

  });
  it('debe validar que la fecha de revición sea un año mayor a la fecha de liberación', async () => {
    const successMockProductsRepository = new successMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: successMockProductsRepository, initialForm: productSelected }));

    const today = new Date();

    act(() => {
      result.current.actions.handleChange('date_release', today);
    });

    let afterAYear = new Date(today);
    afterAYear.setUTCFullYear(afterAYear.getUTCFullYear() + 1);

    await waitFor(() => {
      expect(result.current.state.form.date_revision).toEqual(afterAYear);
    });

    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.date_revision).toEqual('');
    });



    let afterAYearLessOneDay = new Date(afterAYear);
    afterAYearLessOneDay.setUTCDate(afterAYearLessOneDay.getUTCDate() - 1);
    act(() => {
      result.current.actions.handleChange('date_release', today);
    });
    act(() => {
      result.current.actions.handleChange('date_revision', afterAYearLessOneDay);
    });
    await waitFor(() => {
      expect(result.current.state.form.date_revision).toEqual(afterAYearLessOneDay);
    });

    act(() => {
      result.current.actions.handleSubmit();
    });

    await waitFor(() => {
      expect(result.current.state.errors.date_revision).toEqual('Fecha revisión no válida!');
    });

  });

  it('debe manejar errores en al actualizar el producto financiero', async () => {
    const errorMockProductsRepository = new errorMockProductsRepositoryImpl();
    const { result } = renderHook(() => useFinantialProductEdit({ productRepository: errorMockProductsRepository, initialForm: productSelected }));
    act(() => {
      result.current.actions.handleChange('date_release', new Date());
    });
    act(() => {
      result.current.actions.handleSubmit();
    });
    await waitFor(() => {
      expect(result.current.state.updateStatus).toEqual({ status: 'failure', error: 'Error desconocido.' });
    })

  });
});

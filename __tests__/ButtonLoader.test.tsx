import { fireEvent, render } from '@testing-library/react-native'

import { ButtonLoader } from '@/components/ButtonLoader'

describe('ButtonLoader', () => {
  const mockHandle = jest.fn()
  
  beforeEach(() => {
    mockHandle.mockClear()
  })

  describe('Estado normal (no enviando)', () => {
    test('should render the ButtonLoader with correct text', () => {
      const { getByText } = render(
        <ButtonLoader isSubmitting={false} handleSubmit={mockHandle} text='Registrarse' />
      )
      expect(getByText('Registrarse')).toBeTruthy()
    })

    test('should call handleSubmit when pressed', () => {
      const { getByText } = render(
        <ButtonLoader isSubmitting={false} handleSubmit={mockHandle} text='Registrarse' />
      )
      fireEvent.press(getByText('Registrarse'))
      expect(mockHandle).toHaveBeenCalledTimes(1)
    })

    test('should not be disabled when not submitting', () => {
      const { getByText } = render(
        <ButtonLoader isSubmitting={false} handleSubmit={mockHandle} text='Registrarse' />
      )
      // Verificamos que el botón es clickeable llamando a handleSubmit
      fireEvent.press(getByText('Registrarse'))
      expect(mockHandle).toHaveBeenCalledTimes(1)
    })
  })

  describe('Estado de envío (isSubmitting = true)', () => {
    test('should render spinner and "Enviando..." text when submitting', () => {
      const { getByText, getByTestId } = render(
        <ButtonLoader isSubmitting={true} handleSubmit={mockHandle} text='Registrarse' />
      )
      expect(getByTestId('button-loader-text')).toBeTruthy()
      expect(getByText('Enviando...')).toBeTruthy()
    })

    test('should not render original text when submitting', () => {
      const { queryByText } = render(
        <ButtonLoader isSubmitting={true} handleSubmit={mockHandle} text='Registrarse' />
      )
      expect(queryByText('Registrarse')).toBeNull()
    })

    test('should be disabled when submitting', () => {
      const { getByTestId } = render(
        <ButtonLoader isSubmitting={true} handleSubmit={mockHandle} text='Registrarse' />
      )
      // Verificamos que el botón está deshabilitado porque no llama a handleSubmit
      fireEvent.press(getByTestId('button-loader-text'))
      expect(mockHandle).not.toHaveBeenCalled()
    })

  })

  describe('Diferentes textos', () => {
    test('should render different text correctly', () => {
      const { getByText } = render(
        <ButtonLoader isSubmitting={false} handleSubmit={mockHandle} text='Iniciar Sesión' />
      )
      expect(getByText('Iniciar Sesión')).toBeTruthy()
    })
  })
})

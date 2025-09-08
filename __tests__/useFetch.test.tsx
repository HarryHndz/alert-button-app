import { useFetch } from '@/hooks/useFetch'
import { act, renderHook, waitFor } from '@testing-library/react-native'

// Mock de AbortController para el entorno de testing
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: {}
}))

describe('useFetch', () => {
  const mockFetcher = jest.fn()
  const mockOnSuccess = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset de AbortController mock
    ;(global.AbortController as jest.Mock).mockClear()
  })

  describe('Initialization', () => {
    test('should initialize with default values', () => {
      const { result } = renderHook(() => useFetch({ fetcher: mockFetcher }))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.error).toBe(null)
      expect(result.current.data).toBe(null)
      expect(typeof result.current.refetch).toBe('function')
    })

    test('should not execute immediately when immediate=false', () => {
      renderHook(() => 
        useFetch({ fetcher: mockFetcher, immediate: false })
      )

      expect(mockFetcher).not.toHaveBeenCalled()
    })
  })

  describe('Successful execution', () => {
    test('should fetch data successfully on immediate execution', async () => {
      const mockData = [{ id: 1, name: 'Test' }]
      mockFetcher.mockResolvedValue(mockData)

      const { result } = renderHook(() => useFetch({ fetcher: mockFetcher }))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toEqual(mockData)
      expect(result.current.error).toBe(null)
      expect(mockFetcher).toHaveBeenCalledTimes(1)
    })

    test('should call onSuccess callback when provided', async () => {
      const mockData = [{ id: 1, name: 'Test' }]
      mockFetcher.mockResolvedValue(mockData)

      renderHook(() => useFetch({ fetcher: mockFetcher, onSuccess: mockOnSuccess }))

      await waitFor(() => {
        expect(mockOnSuccess).toHaveBeenCalledWith(mockData)
      })
    })

    test('should handle pagination correctly', async () => {
      const firstPageData = [{ id: 1, name: 'First' }]
      const secondPageData = [{ id: 2, name: 'Second' }]
      
      mockFetcher
        .mockResolvedValueOnce(firstPageData)
        .mockResolvedValueOnce(secondPageData)

      const { result } = renderHook(() => useFetch({ fetcher: mockFetcher }))

      // Primera carga
      await waitFor(() => {
        expect(result.current.data).toEqual(firstPageData)
      })

      // Segunda carga (paginación) - usar act para envolver la llamada
      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(result.current.data).toEqual([...firstPageData, ...secondPageData])
      })

      expect(mockFetcher).toHaveBeenCalledTimes(2)
    })
  })

  describe('Error handling', () => {
    test('should handle fetch errors', async () => {
      const errorMessage = 'Network error'
      mockFetcher.mockRejectedValue(new Error(errorMessage))

      const { result } = renderHook(() => 
        useFetch({ fetcher: mockFetcher })
      )

      await waitFor(() => {
        expect(result.current.error).toEqual(new Error(errorMessage))
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.data).toBe(null)
    })
  })

  describe('Manual refetch', () => {
    test('should refetch data when refetch is called', async () => {
      const initialData = [{ id: 1, name: 'Initial' }]
      const refetchData = [{ id: 2, name: 'Refetch' }]
      
      mockFetcher
        .mockResolvedValueOnce(initialData)
        .mockResolvedValueOnce(refetchData)

      const { result } = renderHook(() => 
        useFetch({ fetcher: mockFetcher, immediate: false })
      )

      // Primera ejecución manual
      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(result.current.data).toEqual(initialData)
      })

      // Segunda ejecución manual - el hook está diseñado para paginación, 
      // por lo que agregará los datos en lugar de reemplazarlos
      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(result.current.data).toEqual([...initialData, ...refetchData])
      })

      expect(mockFetcher).toHaveBeenCalledTimes(2)
    })

    test('should set loading state during refetch', async () => {
      let resolvePromise: (value: any) => void
      const promise = new Promise(resolve => {
        resolvePromise = resolve
      })
      
      mockFetcher.mockReturnValue(promise)

      const { result } = renderHook(() => 
        useFetch({ fetcher: mockFetcher, immediate: false })
      )

      await act(async () => {
        result.current.refetch()
      })

      // Verificar que está cargando
      expect(result.current.isLoading).toBe(true)

      // Resolver la promesa
      await act(async () => {
        resolvePromise!([{ id: 1, name: 'Test' }])
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })
    })

  })

  describe('Cleanup', () => {
    test('should abort previous request when new one starts', async () => {
      const mockAbortController = {
        abort: jest.fn(),
        signal: {}
      }
      ;(global.AbortController as jest.Mock).mockReturnValue(mockAbortController)

      mockFetcher.mockResolvedValue([{ id: 1, name: 'Test' }])

      const { result } = renderHook(() => 
        useFetch({ fetcher: mockFetcher, immediate: false })
      )

      // Primera llamada
      await act(async () => {
        result.current.refetch()
      })

      // Segunda llamada (debería abortar la primera)
      await act(async () => {
        result.current.refetch()
      })

      await waitFor(() => {
        expect(mockAbortController.abort).toHaveBeenCalled()
      })
    })
  })
})

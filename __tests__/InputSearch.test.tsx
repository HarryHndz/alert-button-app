import { InputSearch } from "@/components/InputSearch"
import { fireEvent, render } from "@testing-library/react-native"


describe('InputSearch',()=>{
  const mockSetSearchFilter = jest.fn()
  beforeEach(()=>{
    mockSetSearchFilter.mockClear()
  })

  test('should render the InputSearch',()=>{
    const {getByPlaceholderText} = render(<InputSearch searchFilter='test' setSearchFilter={mockSetSearchFilter} />)
    expect(getByPlaceholderText('Buscar...')).toBeTruthy()
  })

  test('should change the value when the input is changed',()=>{
    const {getByPlaceholderText} = render(<InputSearch setSearchFilter={mockSetSearchFilter} searchFilter="test" />)
    const input = getByPlaceholderText('Buscar...')
    fireEvent.changeText(input,'test2')
    expect(mockSetSearchFilter).toHaveBeenCalledWith('test2')
  })

  test('should call setSearchFilter when the input is changed',()=>{
    const {getByPlaceholderText} = render(<InputSearch setSearchFilter={mockSetSearchFilter} searchFilter="test" />)
    const input = getByPlaceholderText('Buscar...')
    fireEvent.changeText(input,'test2')
    expect(mockSetSearchFilter).toHaveBeenCalledTimes(1)
  })

})
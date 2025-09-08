import { render } from '@testing-library/react-native'

import Register from '@/app/register'

describe('Register page',()=>{
  it('should render the register page',()=>{
    const {getAllByText} = render(<Register />)
    getAllByText('Registrarse')
  })
})
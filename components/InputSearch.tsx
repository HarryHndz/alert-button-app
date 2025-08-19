import { SearchIcon } from '@/components/ui/icon';
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";

interface IInputSearchProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

export const InputSearch = ({ searchFilter, setSearchFilter }: IInputSearchProps) => {
  return (
    <Input variant='outline' size='lg' className='w-5/6'>
      <InputSlot className='pl-5'>
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder='Buscar...' value={searchFilter} onChangeText={setSearchFilter} />
    </Input>
  )
}
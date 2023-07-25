import { ChangeEvent } from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchBlockProps {
  searchableValue: string;
  setSearchableValue: (value: string) => void;
}

export function SearchBlock({ searchableValue, setSearchableValue }: SearchBlockProps) {
  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchableValue(e.currentTarget.value);
  };

  return (
    <InputGroup h='52px' w={{ md: '60%', sm: '100%' }} maxW='631px' display='flex' alignItems='center'>
      <Input
        placeholder='Поиск'
        h='full'
        pl='26px'
        bg='#5A5C66'
        borderRadius='0'
        fontSize='14'
        color='#B2B7BF'
        _placeholder={{ color: '#B2B7BF' }}
        value={searchableValue}
        onChange={onSearchInputChange}
      />
      <InputRightElement
        children={<SearchIcon color='#FFFFFF' />}
        height='full'
        mr='13px'
      />
    </InputGroup>
  );
}

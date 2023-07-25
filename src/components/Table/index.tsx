import { useState } from 'react';
import {
  chakra, Table as DataTable, Tbody, Td, Text, Th, Thead, Tr,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { useAppSelector } from '@store/store.ts';
import { errorPostsPage, loadingPostsPage } from '@store/postsSelectors.ts';
import { Post } from '@/interfaces';

type DataTableProps<Post extends object> = {
  data: Post[];
  columns: ColumnDef<Post, any>[];
};

export function Table({
  data,
  columns,
}: DataTableProps<Post>) {
  const loading = useAppSelector(loadingPostsPage);
  const error = useAppSelector(errorPostsPage);

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (!data.length) return <Text mt='20px'>Статей не найдено...</Text>;

  if (loading) return <Text mt='20px'>Загрузка...</Text>;

  if (error) return <Text mt='20px'>Что-то пошло не так...</Text>;

  return (
    <DataTable mt='15px'>
      <Thead h='54px' bg='#474955' boxShadow='0px 4px 27px 0px rgba(230, 231, 234, 0.78)'>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const title: any = header.column.columnDef.header;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  w={title === 'ID' ? '10%' : title === 'Заголовок' ? '50%' : '40%'}
                  textAlign='center'
                  color='#FFFFFF'
                  cursor='pointer'
                  fontSize={{ md: '14', sm: '12' }}
                  textTransform='none'
                  fontFamily='Roboto'
                >
                  {flexRender(
                    title,
                    header.getContext(),
                  )}
                  <chakra.span pl={{ md: '39px', sm: '5px' }}>
                    {header.column.getIsSorted() === 'desc'
                              && <ChevronDownIcon aria-label='sorted descending' w={{ md: '12', sm: '5' }} h='5' />}
                    {header.column.getIsSorted() === 'asc'
                              && <ChevronUpIcon aria-label='sorted ascending' w={{ md: '12', sm: '5' }} h='5' />}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              const currentRowTitle = cell.column.columnDef.header;
              return (
                <Td
                  key={cell.id}
                  fontSize='13px'
                  border='1px solid #E3E6EC'
                  textAlign={currentRowTitle === 'ID' ? 'center' : 'left'}
                  fontWeight='500'
                  color='#474955'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </DataTable>
  );
}

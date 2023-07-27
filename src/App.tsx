import { useEffect, useMemo, useState } from 'react';
import { ChakraProvider, extendTheme, Flex } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { Table } from '@components/Table';
import { SearchBlock } from '@components/SearchBlock';
import { useAppDispatch, useAppSelector } from '@store/store.ts';
import { getPosts } from '@store/postsThunk.ts';
import { getAllPosts } from '@store/postsSelectors.ts';
import { Pagination } from '@components/Pagination';
import { useParams } from 'react-router-dom';
import { Post } from '@/interfaces';
import '@fontsource/roboto';

const columnHelper = createColumnHelper<Post>();

const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: 'ID',
  }),
  columnHelper.accessor('title', {
    cell: (info) => info.getValue(),
    header: 'Заголовок',
  }),
  columnHelper.accessor('body', {
    cell: (info) => info.getValue(),
    header: 'Описание',
  }),
];

const breakpoints = {
  sm: '380px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme({
  fonts: {
    body: '\'Roboto\', sans-serif',
  },
  breakpoints,
});

function App() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(getAllPosts);
  const [searchableValue, setSearchableValue] = useState<string>('');
  const params = useParams();

  useEffect(() => {
    if (Number(params.page) === 1) {
      dispatch(getPosts(0));
    } else {
      const pageNumberFromUrl = Number(params.page) * 10;
      dispatch(getPosts(pageNumberFromUrl));
    }
  }, [params]);

  const searchablePosts = useMemo(
    () => posts.filter((post) => post.title.toLowerCase().includes(searchableValue.toLowerCase())
          || post.body.toLowerCase().includes(searchableValue.toLowerCase())),
    [posts, searchableValue],
  );

  return (
    <ChakraProvider theme={theme}>
      <Flex direction='column' w='100%' pt={{ md: '24px', sm: '0' }} px={{ md: '77px', sm: '0' }}>
        <SearchBlock searchableValue={searchableValue} setSearchableValue={setSearchableValue} />
        <Table columns={columns} data={searchablePosts} />
        {searchablePosts.length ? <Pagination pagesCount={searchablePosts.length - 1} /> : null}
      </Flex>
    </ChakraProvider>
  );
}

export default App;

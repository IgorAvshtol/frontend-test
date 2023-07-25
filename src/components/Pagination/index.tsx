import { memo, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useAppDispatch } from '@store/store.ts';
import { setNewPage } from '@store/postsSlice.ts';

interface PaginationProps {
  pagesCount: number;
}

export const Pagination = memo(({ pagesCount }: PaginationProps) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const currentPage = Number(params.page);

  const pagesArray = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= pagesCount; i++) {
      arr.push(i);
    }
    return arr;
  }, [pagesCount]);

  const onNextPageBtnClick = () => {
    if (currentPage) {
      navigate(`/posts/${currentPage + 1}`);
    } else {
      navigate('/posts/2');
    }
  };

  const onPrevPageBtnClick = () => {
    navigate(`/posts/${currentPage - 1}`);
  };

  const onPageClick = (page: number) => {
    dispatch(setNewPage(page));
  };

  return (
    <Flex justifyContent='center'>
      <Flex mt='15px' w='90%' justifyContent='space-between'>
        <Button
          color='#474955'
          variant='ghost'
          onClick={onPrevPageBtnClick}
          isDisabled={currentPage <= 1 || !currentPage}
        >
          Назад
        </Button>
        <Flex w={{ md: '200px', sm: '170px' }} alignItems='center' justifyContent='space-between'>
          {
              pagesArray.map((page) => (
                <Link to={`/posts/${String(page)[0]}`} key={page}>
                  <Text
                    fontSize='18px'
                    fontStyle='italic'
                    fontWeight='700'
                    color={page === currentPage || (page === 1 && !currentPage) ? '#7EBC3C' : '#474955'}
                    cursor='pointer'
                    onClick={() => onPageClick(page)}
                  >
                    {page}
                  </Text>
                </Link>
              ))
            }
        </Flex>
        <Button
          color='#474955'
          variant='ghost'
          onClick={onNextPageBtnClick}
          isDisabled={currentPage >= pagesCount}
        >
          Далее
        </Button>
      </Flex>
    </Flex>
  );
});

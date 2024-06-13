import FormAntd from '../../components/FormAntd/FormAntd';
import useRouter from '../../hooks/useRouter';
import QUERY_KEY from '../../utils/queryKey';
import { useQuery } from '@tanstack/react-query';
import { getStoreByKeyword } from '../../services/apiStore/store/storeApi';

const DetailStore = () => {
  const [slugStore, navigate] = useRouter('slugStore');

  const query = useQuery({
    queryKey: [QUERY_KEY.GET_STORE_BY_KEYWORD],
    queryFn: () => getStoreByKeyword(slugStore),
  });

  return (
    <>
      {query.isSuccess && query.data ? (
        <FormAntd
          initialValues={query.data}
          callback={() => navigate(`/admin/store/`)}
        />
      ) : (
        navigate('/*')
      )}
    </>
  );
};

export default DetailStore;

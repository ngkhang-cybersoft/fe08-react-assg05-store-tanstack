import {
  Table,
  Input,
  Flex,
  Row,
  Col,
  Button,
  ConfigProvider,
  Space,
} from 'antd';

import { useEffect, useState } from 'react';
import tableProps from './tableProps';
import ModalAntd from '../../components/ModalAntd/ModalAntd';
import FormAntd from '../../components/FormAntd/FormAntd';
import useRouter from '../../hooks/useRouter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QUERY_KEY from '../../utils/queryKey';
import {
  delStore,
  getAllStores,
  searchStore,
} from '../../services/apiStore/store/storeApi';

const { Search } = Input;

const StoreList = () => {
  const [, navigate] = useRouter();
  const [listStore, setListStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [storeEdit, setStoreEdit] = useState({});
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.GET_ALL_STORE],
    queryFn: getAllStores,
    staleTime: 10 * 60 * 1000,
    gcTime: 24 * 60 * 1000,
  });

  const mutationSearch = useMutation({
    mutationKey: [QUERY_KEY.SEARCH],
    mutationFn: searchStore,
    onSuccess: (res) => {
      setListStore(res);
    },
  });

  const mutationDel = useMutation({
    mutationKey: [QUERY_KEY.DEL_STORE],
    mutationFn: delStore,
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.GET_ALL_STORE);
    },
  });

  const onSearch = (value, _e, info) => {
    mutationSearch.mutateAsync(info.source !== 'clear' ? value : '');
  };

  const btnAction = [
    {
      id: 1,
      title: 'View',
      btnColor: {
        colorPrimary: `rgb(0 123 255)`,
        colorPrimaryHover: `rgb(0 105 217)`,
      },
      callback: ({ alias }) => navigate(`${alias}`),
    },
    {
      id: 2,
      title: 'Edit',
      btnColor: {
        colorPrimary: `rgb(255 193 7)`,
        colorPrimaryHover: `rgb(224 168 0)`,
      },
      callback: (data) => {
        setStoreEdit(data);
        setModal(true);
      },
    },
    {
      id: 3,
      title: 'Delete',
      btnColor: {
        colorPrimary: `rgb(220 53 69)`,
        colorPrimaryHover: `rgb(200 35 51)`,
      },
      callback: ({ id }) => mutationDel.mutateAsync(id),
    },
  ];

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      hidden: true,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      showSorterTooltip: {
        target: 'full-header',
      },
      // TODO: Refactor sort function
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Action',
      key: 'action',
      ellipsis: true,
      render: (_, record) => (
        <Space size="middle" wrap={true}>
          {btnAction.map((btn) => {
            return (
              <ConfigProvider
                key={btn.id}
                theme={{
                  components: {
                    Button: btn.btnColor,
                  },
                }}
              >
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => btn.callback(record)}
                >
                  {btn.title}
                </Button>
              </ConfigProvider>
            );
          })}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    setListStore(query.data);
    setLoading(false);
  }, [query.data]);

  return (
    <>
      <Flex className="mb-4">
        <Row
          className="w-100"
          gutter={16}
          align={'stretch'}
          justify="space-between"
        >
          <Col flex={2}>
            <h2>List Store</h2>
          </Col>
          <Col flex={1}>
            <Search
              size="large"
              placeholder="Enter search store name"
              onSearch={onSearch}
              allowClear
              enterButton="Search"
            />
          </Col>
        </Row>
      </Flex>

      <Table
        {...tableProps}
        loading={loading}
        dataSource={listStore}
        columns={columns}
      />
      <ModalAntd isOpen={modal} handleModal={setModal}>
        <FormAntd
          action="edit"
          initialValues={storeEdit}
          callback={() => setModal(false)}
        />
      </ModalAntd>
    </>
  );
};

export default StoreList;

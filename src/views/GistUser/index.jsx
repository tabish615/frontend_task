import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Avatar, Row, Col, message, Spin } from 'antd'
import moment from 'moment';
import Fuse from "fuse.js"
import { Search } from "../../component/search"

function GistUSer() {
  const [list, setList] = useState([])
  const [searchList, setSearchList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    getListOfGistUser()
  }, [])

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'owner',
      key: 'avatar',
      render: item => <Avatar src={item.avatar_url} />
    },
    {
      title: 'Name',
      dataIndex: 'owner',
      key: 'username',
      render: item => <div>{item.login}</div>,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: item => <div>{moment(item).format("MMM Do YY")}</div>,
    },

  ];

  const getListOfGistUser = async () => {
    setIsLoading(true)
    try {
      const user = await axios.get('https://api.github.com/gists/public');
      setList(user.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      message.error("Some thing went wrong")
    }
  }

  const filterContact = (text) => {
    console.log(text)
    setSearchText(text);
    const options = {
      includeScore: true,
      threshold: 0.3,
      keys: ["owner.login"]
    }
    const fuse = new Fuse(list, options)
    let result = fuse.search(text);
    let contactListResult = result.length ? result.map(item => item.item) : []
    setSearchList(contactListResult);
  }

  return (
    <div>
      <Row className="flex-center-center mt-10 mb-10">
        <Col lg={8} md={10} sm={12} xs={12} >
          <Search
            placeHolder="Search contact"
            isLoading={false}
            onChange={(text) => filterContact(text)} />
        </Col>
      </Row>
      {
        isLoading ?
          <Row className="flex-center-center mt-10 mb-10">
            <Col lg={24} >
              <div className="flex-center-center mt-10 mb-10" >
                <Spin size="large" />
              </div>
            </Col>
          </Row> : <Table dataSource={searchText ? searchList : list} columns={columns} />
      }
    </div>

  );
}

export default GistUSer

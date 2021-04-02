import React from 'react';
import Table from "./components/table/table";
import Column from "./components/table/column";
import axios from "axios";
import {ETableContentAliment} from "./components/table/types";
import './styles/app.scss'

function App() {

  const loadUsersData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users')
  };

  const loadPostsData = (params: any) => {
    return axios.get('https://api.github.com/search/repositories', {
      params: {
        per_page: params.perPage,
        page: params.currentPage,
        q: 'lodash'
      }
    }).then(result => {
      return {
        data: result.data.items,
        total: result.data.total_count
      }
    })
  };

  return (
      <div className="app">
        {/*<br/>*/}
        {/*<Table loadData={loadUsersData} contentAliment={ETableContentAliment.CENTER}>*/}
        {/*  <Column header={'test'}*/}

        {/*  >*/}
        {/*    {*/}
        {/*      (row: any) => {*/}
        {/*        return <p>test {row.name}<button>OK</button></p>*/}
        {/*      }*/}
        {/*    }*/}
        {/*  </Column>*/}
        {/*  <Column header={'test'} path={'company.name'} />*/}
        {/*  <Column header={'test'} path={'email'} />*/}
        {/*  <Column header={'test'} path={'phone'} />*/}
        {/*  <Column header={'test'} path="website" />*/}
        {/*</Table>*/}
        <h2>Posts</h2>
          <Table loadData={loadPostsData} contentAliment={ETableContentAliment.CENTER} className="github-table">
            <Column header={'test'} path={'name'} />
            <Column header={'test'} path={'updated_at'} />
          </Table>
      </div>
  );
}

export default App;

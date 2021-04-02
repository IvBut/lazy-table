import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducers';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {fetchUsers} from "../store/action-creator/user";
import {useActions} from "../hooks/useAction";

const UsersList: React.FC = () => {
  const { users, error, loading } = useTypedSelector((state: RootState) => state.user);
  const {fetchUsers} = useActions();

  useEffect(() => {
    fetchUsers()
  },[]);
  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {

    return <h1>Error {error}</h1>
  }

  return (
      <div>
        {users.map(user => (
            <div key={user.id}>{user.name}</div>
        ))}
      </div>
  );
};

export default UsersList;

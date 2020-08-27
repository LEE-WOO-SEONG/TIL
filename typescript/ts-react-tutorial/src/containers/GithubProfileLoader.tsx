import React, { useCallback } from 'react';
import GithubUsernameForm from '../components/GithubUsernameForm';
import GithubProfileInfo from '../components/GithubProfileInfo';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
// import { getUserProfileThunk } from '../modules/github';
import { getUserProfileRequestSaga } from '../modules/githubSaga';

function GithubProfileLoader() {
  const { loading, data, error } = useSelector(
    (state: RootState) => state.github.userProfile
  );
  console.log(data);
  const dispatch = useDispatch();

  const onSubmitUsername = useCallback(
    (username: string) => dispatch(getUserProfileRequestSaga(username)),
    [dispatch]
  );

  return (
    <>
      <GithubUsernameForm onSubmitUsername={onSubmitUsername} />
      {loading && <p>로딩중...</p>}
      {error && <p>에러 발생!...</p>}
      {data && (
        <GithubProfileInfo
          name={data.name}
          thumbnail={data.avatar_url}
          bio={data.bio}
          blog={data.blog}
        />
      )}
    </>
  );
}

export default GithubProfileLoader;

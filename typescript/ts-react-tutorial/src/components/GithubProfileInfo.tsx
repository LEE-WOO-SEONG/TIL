import React from 'react';

type GithubProfileInfo = {
  name: string;
  thumbnail: string;
  bio: string;
  blog: string;
};

function GithubProfileInfo({ name, thumbnail, bio, blog }: GithubProfileInfo) {
  return (
    <div>
      <div>
        <img src={thumbnail} alt="user thumbnail" />
        <div>{name}</div>
        <p>{bio}</p>
        <div>{blog !== '' && <a href={blog}>블로그</a>}</div>
      </div>
    </div>
  );
}

export default GithubProfileInfo;

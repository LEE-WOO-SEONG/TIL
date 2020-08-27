import React, { ChangeEvent, useState, FormEvent } from 'react';

type GithubUsernameFormProps = {
  onSubmitUsername: (username: string) => void;
};

function GithubUsernameForm({ onSubmitUsername }: GithubUsernameFormProps) {
  const [input, setInput] = useState<string>('');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmitUsername(input);
    setInput('');
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="조회할 github 계정을 입력하세요.."
        onChange={onChange}
        value={input}
      />
      <button type="submit">조회</button>
    </form>
  );
}

export default React.memo(GithubUsernameForm);

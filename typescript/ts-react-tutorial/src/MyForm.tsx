import React, { useState } from 'react';

interface Params {
  name: string;
  description: string;
}

interface MyFormProps {
  onSubmit(form: Params): void;
}

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState<Params>({
    name: '',
    description: '',
  });

  const { name, description } = form;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );

  function onChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: '',
      description: '',
    });
  }
}

export default MyForm;

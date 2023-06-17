type PropsType = {
  setValue: Function;
  placeholder: string;
};

export default function TextInput({ setValue, placeholder }: PropsType) {
  const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value);

  return (
    <input
      type="text"
      onChange={getValue}
      placeholder={placeholder}
      className="input-style"
    />
  );
}

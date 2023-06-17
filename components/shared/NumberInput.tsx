type PropsType = {
  setValue: Function;
  placeholder: string;
};

export default function NumberInput({ setValue, placeholder }: PropsType) {
  const getValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(parseInt(event.target.value));

  return (
    <input
      type="number"
      onChange={getValue}
      placeholder={placeholder}
      className="input-style"
    />
  );
}

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  placeholder?: string;
};

const ProfileInput = ({
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}: Props) => (
  <div>
    <label className="text-sm font-medium text-gray-600">{label}</label>
    <input
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder ?? label}
      className={`w-full mt-1 px-4 py-2 border ${
        value ? "border-gray-300" : "border-red-300"
      } rounded-md`}
      disabled={disabled}
    />
  </div>
);

export default ProfileInput;

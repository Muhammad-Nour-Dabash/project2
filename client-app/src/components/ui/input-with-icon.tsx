import { Input } from "@/components/ui/input";
import type { ElementType, ChangeEvent } from "react";

interface InputWithIconProps {
  icon: ElementType;
  iconClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;

  type?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function InputWithIcon({
  icon: Icon,
  iconClassName,
  inputClassName,
  wrapperClassName,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  disabled,
}: InputWithIconProps) {
  return (
    <div className={`relative ${wrapperClassName ?? ""}`}>
      <Icon
        className={`absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black ${iconClassName ?? ""}`}
      />
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          height: 48,
          border: "1px solid black",
          borderRadius: 5,
        }}
        className={`ps-10 ${inputClassName ?? ""}`}
      />
    </div>
  );
}

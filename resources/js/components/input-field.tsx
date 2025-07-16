import { Input } from '@/components/ui/input';

interface Props {
    label: string;
    placeholder: string;
    labelStyle: string;
    value: string;
    errorName: string;
    errorStyle: string;
    fieldName: string;
    setData: (fieldName: string, value: string) => void;
}

const InputField = ({label, placeholder, labelStyle, value, errorName, errorStyle, fieldName, setData}: Props) => {
    return (
        <div>
            <label className={labelStyle}>{label}</label>
            <Input
                value={value}
                onChange={(e) => setData(fieldName, e.target.value)}
                className={`pt-5 pb-5 ${errorName ? 'border-red-500' : ''}`}
                placeholder={placeholder}
            />
            {errorName && <p className={errorStyle}>{errorName}</p>}
        </div>
    );
};

export default InputField;

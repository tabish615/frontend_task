import { Input } from 'antd';

export const Search = (props) => {
    const { Search } = Input;
    const { isLoading, onChange, placeHolder } = props;
    return (
        <Search placeholder={placeHolder} loading={isLoading} onChange={(e) => onChange(e.target.value)} />
    )
}

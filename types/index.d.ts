export type Option = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface ISearchProps {
  handleSearchLogin: (ETHquery?: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  togglePalette?: Function;
  inputValue?: string;
  chain?: string;
}

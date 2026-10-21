import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';

// react-redux 9 の useDispatch は既定で UnknownAction しか受け付けず、
// typescript-fsa のアクションや thunk を dispatch できないため、型付きの dispatch を使う
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

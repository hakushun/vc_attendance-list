import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../libs/firebase/initFirebase';
import { mapUserData } from '../libs/utils/mapUserData';
import {
  selectIsLoading,
  selectUser,
  auth as authAction,
  Userdata,
} from '../redux/modules/app/user';
import { useRouter } from './useRouter';

type Hooks = {
  user: Userdata;
  isLoading: boolean;
};
export const useUser = (): Hooks => {
  const dispatch = useDispatch();
  const { router } = useRouter();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    const cancelAuthListener = onAuthStateChanged(auth, async (usr) => {
      if (usr) {
        dispatch(authAction(mapUserData(usr)));
      } else {
        dispatch(authAction(null));
        router.pathname !== '/signup' && router.push('/login');
      }
    });
    return () => {
      cancelAuthListener();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, isLoading };
};

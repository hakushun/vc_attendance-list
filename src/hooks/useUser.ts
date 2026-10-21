import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import { auth } from '../libs/firebase/initFirebase';
import { mapUserData } from '../libs/utils/mapUserData';
import type { Userdata } from '../redux/modules/app/user';
import { selectIsLoading, selectUser, auth as authAction } from '../redux/modules/app/user';
import { useRouter } from './useRouter';

type Hooks = {
  user: Userdata;
  isLoading: boolean;
};
export const useUser = (): Hooks => {
  const dispatch = useAppDispatch();
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

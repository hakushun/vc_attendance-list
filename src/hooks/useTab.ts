import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './useAppDispatch';
import type { Tab, Value } from '../redux/modules/ui/tab';
import { change, selectTab } from '../redux/modules/ui/tab';

type CustomHooks = () => {
  tab: Tab;
  handleChangeSettingTab: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};
export const useTab: CustomHooks = () => {
  const dispatch = useAppDispatch();
  const tab = useSelector(selectTab);

  const handleChangeSettingTab = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = e.currentTarget;
      const value = target.getAttribute('aria-controls') as Value;
      dispatch(change({ setting: value }));
    },
    [dispatch],
  );

  return { tab, handleChangeSettingTab };
};

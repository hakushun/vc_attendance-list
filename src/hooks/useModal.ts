import { useDispatch, useSelector } from 'react-redux';
import { selectPracticeModalIsShown, togglePracticeModal } from '../redux/modules/modal';

type Hooks = {
  practiceModalIsShown: boolean;
  handleTogglePracticeModal: () => void;
};

export const useModal = (): Hooks => {
  const dispatch = useDispatch();
  const practiceModalIsShown = useSelector(selectPracticeModalIsShown);

  const handleTogglePracticeModal = () => {
    dispatch(togglePracticeModal(!practiceModalIsShown));
  };

  return { practiceModalIsShown, handleTogglePracticeModal };
};

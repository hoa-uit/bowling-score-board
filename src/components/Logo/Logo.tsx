import { IconBowling } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ROUTES } from '@/constants';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Button
      size="lg"
      style={{ fontFamily: 'Lato' }}
      variant="transparent"
      justify="center"
      onClick={() => navigate(ROUTES.ROOT)}
      leftSection={<IconBowling size={36} />}
    >
      Bowling Score Tracker
    </Button>
  );
};

export default Logo;

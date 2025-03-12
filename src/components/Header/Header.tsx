import { IconMoon, IconSun, IconWorld } from '@tabler/icons-react';
import { ActionIcon, Burger, Flex, Group, useMantineColorScheme } from '@mantine/core';
import Logo from '../Logo/Logo';

type HeaderProps = {
  opened: boolean;
  toggle: () => void;
};

const Header = ({ opened, toggle }: HeaderProps) => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <>
      <Flex justify="space-between" align="center" h="100%">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo />
        <Group>
          <ActionIcon variant="light" size="lg">
            <IconWorld size={20} />
          </ActionIcon>
          <ActionIcon variant="light" size="lg" onClick={toggleColorScheme}>
            {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
          </ActionIcon>
        </Group>
      </Flex>
    </>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  Center,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CopyIcon,
  DownloadIcon,
  SettingsIcon,
} from '@chakra-ui/icons'
import { useWindowSize } from "./internal/helpersFunc"

function DesktopNav() {
  function getTabId() {
    switch (window.location.pathname) {
      case "/autoLike": return 0
      case "/learn": return 1
      case "/load": return 2
      case "/settings": return 3
    }
  }

  return <div>
    <Center>
      {useWindowSize().width > 1064 ?
        <Text left='1%' position='absolute' color='red.500' fontSize='large' fontStyle='inherit' fontWeight='bold' fontFamily='inherit'>Tinder Neural Network Like</Text>
        :
        <></>
      }
      <Tabs m='0.5%' orientation='horizontal' align='center' variant='solid-rounded' colorScheme='red' defaultIndex={getTabId()} isManual={true}>
        <TabList >
          <Tab as={Link} to='/autoLike' id='/autoLike'>Автолайк</Tab>
          <Tab as={Link} to='/learn' id='/learn'>Обучение нейронной сети</Tab>
          <Tab as={Link} to='/load' id='/load'>Загрузка</Tab>
          <Tab as={Link} to='/settings' id='/settings'>Настройки</Tab>
        </TabList>
      </Tabs>
    </Center>
    <Divider />

  </div>
}

function MobileNav() {

  return <div>
    <Box display='flex' position='relative'>
      <Box width="100%" mt='7px' position='absolute'>
        <Center>
          <Text color='red.500' fontSize='large' fontStyle='inherit' fontWeight='bold' fontFamily='inherit'>Tinder Neural Network Like</Text>
        </Center>
      </Box>

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList zIndex='11'>
          <MenuItem as={Link} to='/autoLike'>
            Автолайк
          </MenuItem>
          <MenuItem icon={<CopyIcon />} as={Link} to='/learn'>
            Обучение нейронной сети
          </MenuItem>
          <MenuItem icon={<DownloadIcon />} as={Link} to='/load'>
            Загрузка
          </MenuItem>
          <MenuItem icon={<SettingsIcon />} as={Link} to='/settings'>
            Настройки
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
    <Divider />

  </div>
}

function AppNav() {
  return <>
    {useWindowSize().width < 767 ? <MobileNav /> : <DesktopNav />}
  </>
}

export default AppNav;
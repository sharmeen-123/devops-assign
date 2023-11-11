import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Noti } from './noti';

export const Demo = ()=> {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles TealwithIcon>
      <Notifications 
      
    // autoClose='2000'
    limit={1}
    position="top-center"
      />
      <Noti />
    </MantineProvider>
  );
}

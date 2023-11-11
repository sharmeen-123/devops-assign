import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NotiError } from './error';

export const ErrorNoti = ()=> {
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles TealwithIcon>
      <Notifications 
      limit={1}
      position="top-center"/>
      <NotiError />
    </MantineProvider>
  );
}

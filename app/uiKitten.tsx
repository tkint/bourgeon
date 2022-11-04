import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { FC, ReactNode } from 'react';
import customMapping from '../mapping.json';
import { useAppTheme } from './hooks/useAppTheme';

export const UIKittenProvider: FC<{ children: ReactNode }> = (props) => {
  const { theme } = useAppTheme();

  return (
    <>
      <IconRegistry icons={EvaIconsPack}></IconRegistry>
      <ApplicationProvider {...eva} customMapping={customMapping} theme={{ ...eva[theme], ...colors }}>
        {props.children}
      </ApplicationProvider>
    </>
  );
};

export const colors = {
  'color-primary-100': '#D8F9DB',
  'color-primary-200': '#B3F4C0',
  'color-primary-300': '#86E0A1',
  'color-primary-400': '#60C187',
  'color-primary-500': '#339966',
  'color-primary-600': '#25835D',
  'color-primary-700': '#196E54',
  'color-primary-800': '#10584A',
  'color-primary-900': '#094943',
  'color-success-100': '#E4FBD6',
  'color-success-200': '#C5F7AE',
  'color-success-300': '#99E881',
  'color-success-400': '#6FD25D',
  'color-success-500': '#38B52F',
  'color-success-600': '#229B24',
  'color-success-700': '#178222',
  'color-success-800': '#0E681F',
  'color-success-900': '#09561D',
  'color-info-100': '#D2E4FE',
  'color-info-200': '#A5C8FE',
  'color-info-300': '#78A8FC',
  'color-info-400': '#568CFA',
  'color-info-500': '#2060F7',
  'color-info-600': '#1749D4',
  'color-info-700': '#1036B1',
  'color-info-800': '#0A258F',
  'color-info-900': '#061976',
  'color-warning-100': '#FFF6CD',
  'color-warning-200': '#FFEB9B',
  'color-warning-300': '#FFDD69',
  'color-warning-400': '#FFCF43',
  'color-warning-500': '#FFB805',
  'color-warning-600': '#DB9703',
  'color-warning-700': '#B77902',
  'color-warning-800': '#935D01',
  'color-warning-900': '#7A4900',
  'color-danger-100': '#FCDBD3',
  'color-danger-200': '#FAB1A8',
  'color-danger-300': '#F07C7B',
  'color-danger-400': '#E15864',
  'color-danger-500': '#CE2745',
  'color-danger-600': '#B11C45',
  'color-danger-700': '#941343',
  'color-danger-800': '#770C3D',
  'color-danger-900': '#62073A',
};

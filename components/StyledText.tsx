import { Text, TextProps } from './Themed';

export const MonoText: React.FunctionComponent<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'space-mono' }]}
    />
  );
};

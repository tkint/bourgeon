import { Text, TextProps } from "./Text";

export const MonoText: React.FunctionComponent<TextProps> = (props) => {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'space-mono' }]}
    />
  );
};

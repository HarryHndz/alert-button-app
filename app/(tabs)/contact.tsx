import { StyleSheet, Text } from 'react-native';

import { Box } from '@/components/ui/box';

export default function TabTwoScreen() {
  return (
    <Box className='flex-1 items-center justify-center'>
      <Text>Contact</Text>
    </Box>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});

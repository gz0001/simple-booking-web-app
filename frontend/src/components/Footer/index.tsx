import * as React from 'react'

import { Box, Text } from 'tt-react-ui-2'
import { Hr } from 'atoms/Hr'

// ================================================================================================

export const Footer: React.FunctionComponent = props => {
  return (
    <Box className="Footer" display="block" pt="4">
      <Hr mx="auto" style={{width: "80%"}}/>
      <Text className="Footer__credit" center py="4" paragraph size="sm">
        Made with <Text color="first">❤</Text> from <Text color="first">tt-dev</Text>
      </Text>
    </Box>
  )
}

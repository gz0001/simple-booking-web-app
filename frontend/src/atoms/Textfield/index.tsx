import * as React from 'react'
import cx from 'classnames'
import { Textfield as TextField, TextfieldProps } from 'tt-react-ui-2'

// ================================================================================================




export const Textfield: React.FunctionComponent<TextfieldProps> = props => {

  return <TextField {...props} material></TextField>
}


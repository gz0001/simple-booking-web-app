import * as React from 'react'
import cx from 'classnames'
import { Box, createState } from 'tt-react-ui-2'

// Components:
import { Icon } from 'atoms/Icon'
import { Textfield } from 'atoms/Textfield'

// Styles:
import './style.css'

// ================================================================================================

export interface HeadBarProps {
  onSlide: (next: boolean) => void
}

export const HeadBar: React.FunctionComponent<HeadBarProps> = ({ onSlide }) => {
  // Hooks:
  const [state, setState] = createState({ searchTerm: '' })

  const { searchTerm } = state

  // Handlers:

  const handleInput = React.useCallback((searchTerm: string) => setState({ searchTerm }), [])
  return (
    <Box className={cx('HeadBar')} position="absolute" h="16" px="6" items="center" z="10">
      <Box>
        <Icon
          className={cx('HeadBar-arrow')}
          color="hover:first"
          cursor="hover:pointer"
          display="flex"
          items="center"
          name="chevron-left"
          pr="2"
          textProps={{ onClick: () => onSlide(false) }}
        />
        <Icon
          className={cx('HeadBar-arrow')}
          color="hover:first"
          cursor="hover:pointer"
          display="flex"
          items="center"
          name="chevron-right"
          px="2"
          textProps={{ onClick: () => onSlide(true) }}
        />
        <Icon
          border="l-1"
          className={cx('HeadBar-search')}
          color="hover:first"
          cursor="hover:pointer"
          display="flex"
          items="center"
          name="search"
          px="2"
        />
        <Textfield
          className={cx('HeadBar-searchfield flex-1')}
          onInput={handleInput}
          material
          placeholder="Search upcoming events..."
          value={searchTerm}
        />
        <Icon
          className={cx('Headbar-calendar')}
          display="flex"
          items="center"
          name="calendar"
          pl="2"
          pr="4"
        />
        <Icon className={cx('Headbar-alarm')} display="flex" items="center" name="bell-o" />
      </Box>
    </Box>
  )
}

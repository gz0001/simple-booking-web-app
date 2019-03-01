import React, { useState } from 'react'
import cx from 'classnames'
import { Link } from 'react-router-dom'
import { Box, Headline, Container, Row, Col, Button } from 'tt-react-ui-2'
import posed, { PoseGroup } from 'react-pose'
import { tween } from 'popmotion'

// Components:
import { Hr } from 'atoms/Hr'
import { Login } from 'components/Login'
import { Register } from 'components/Register'

// Styles:
import './style.css'

// Images:
import logo from 'assets/images/logo.png'

// const
const FadeBox = posed(Box)({
  preEnter: {
    opacity: 0,
    y: '20%'
  },
  enter: {
    opacity: 1,
    y: '0',
    duration: 100,
    transition: props => {
      return tween(props)
    }
  }
})

// ================================================================================================

export interface AuthProps {}

export const Auth: React.FunctionComponent<AuthProps> = ({}) => {
  const [isLogin, setLogin] = useState(true)
  return (
    <Container className={cx('Auth')} fluid items="center" py="10">
      <Row justify="center">
        <Col className="Auth-form" width="10, md:6, lg:5">
          <PoseGroup preEnterPose="preEnter" animateOnMount={true}>
            <FadeBox
              className="w-full flex flex-col bg-box px-12 py-6"
              key="form"
              withParent={false}
            >
              <Box className="Auth-header" justify="center" items="center">
                <img alt="logo" className="Auth-logo w-12" src={logo} />
                <Headline level="1" ml="4">
                  events.io
                </Headline>
              </Box>
              <Hr my="6" />
              <Login setLogin={setLogin} isLogin={isLogin} />{' '}
              <Register setLogin={setLogin} isLogin={isLogin} />
            </FadeBox>
          </PoseGroup>
        </Col>
      </Row>
    </Container>
  )
}

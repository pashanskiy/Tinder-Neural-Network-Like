import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  theme,
  Center,
  Spinner,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { useSpring, animated } from 'react-spring'
import * as d3 from 'd3-ease'
import AppNav from "./appNav"
import AutoLike from "./tabs/autoLike"
import LearnNN from "./tabs/learnNN"
import LoadTab from "./tabs/loadTab"
import SettingsTab from "./tabs/settingsTab"

import { GrpcServiceClient } from "./grpctransport/grpc_pb_service"
import grpcLibrary from "./grpctransport/grpc_pb"

 const Tnn = () => {
  // const grpcClient = new GrpcServiceClient("http://localhost:8090") // debug
  const grpcClient = new GrpcServiceClient("http://" + location.host) // prod

  console.log("Host:", location.host)

  const [token, setToken] = useState("")
  const [tokenActual, setTokenActual] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    grpcClient.getToken(new grpcLibrary.EmptyMessage(), null, (err, response) => {
          if (err) {
            console.log(err)
          } else {
            
              setToken(response.getToken())
              setTokenActual(response.getActualtoken())
              setLoaded(true)
          }
        })
  }, [])

    function LoadingPage() {
      const animation = useSpring({
        to: [{ opacity: 1 }],
        from: { opacity: 0 },
        config: { duration: 5000, easing: d3.easeExpOut }
      })
      return <div >
        <animated.div style={animation}>
          <ChakraProvider theme={theme}>
            <Center>
              <Spinner position='absolute' top='45%' size='xl' color='black' />
            </Center>
          </ChakraProvider>
        </animated.div>
      </div>
    }

    const CorePage = (props: { grpcClient: GrpcServiceClient, token: string, tokenActual: boolean }) => {
      const [faceDetectRun, setFaceDetectRun] = React.useState(true)
      const cancelAlertRef = React.useRef()

      function getFaceDetectRunInfoStream() {
        var getFaceDetectRunStream = props.grpcClient.streamingGetFaceDetectRunInfo(new grpcLibrary.EmptyMessage(), null)
        getFaceDetectRunStream.on('data', function (r) {
          setFaceDetectRun(r.getFacedetectrun())
        })
        getFaceDetectRunStream.on('end', function () {
          setTimeout(() => { getFaceDetectRunInfoStream() }, 1000)
        })
      }

      useEffect(() => {
        getFaceDetectRunInfoStream()
      }, [])

      const animation = useSpring({
        to: [{ opacity: 1 }],
        from: { opacity: 0 },
        config: { duration: 1000, easing: d3.easeCubicOut }
      })
      return (
        <div>
          <animated.div style={animation}>
            <ChakraProvider theme={theme}>
              <AlertDialog
                isOpen={!faceDetectRun}
                leastDestructiveRef={cancelAlertRef}
                onClose={() => { }}
                isCentered={true}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent bgColor='red.600'>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold" textColor='white'>
                      Face Detect не запущен! (или запускается)
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      <Text textColor='white'>Tinder Neural Netwok Like не будет работать без нейронной сети.</Text>
                      <Text textColor='white'>Запустите Face Detect.</Text>
                    </AlertDialogBody>

                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              <Router>
                <AppNav/>
                <Switch>

                  <Route exact path="/">

                  </Route>

                  <Route path="/autoLike">
                    <AutoLike grpcClient={grpcClient} />
                  </Route>

                  <Route path="/learn">
                    <LearnNN grpcClient={grpcClient} />
                  </Route>

                  <Route path="/load">
                    <LoadTab grpcClient={grpcClient} />
                  </Route>

                  <Route path="/settings">
                    <SettingsTab grpcClient={grpcClient} />
                  </Route>

                  <Route path="*">
                    {tokenActual ? <Redirect to="/autoLike" /> : <Redirect to="/settings" />}
                  </Route>

                </Switch>
              </Router>
            </ChakraProvider>
          </animated.div>
        </div>
      )
    }

    if (loaded) {
      return (
        <CorePage grpcClient={grpcClient} token={token} tokenActual={tokenActual} />
      )
    } else {
      return <div>
        <LoadingPage />
      </div>
    }
  }

export default Tnn
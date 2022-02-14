import React, { useEffect, useRef, useState } from 'react';
import {
  Center,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Box,
  Divider,
  Switch,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { GrpcServiceClient, ResponseStream } from "../grpctransport/grpc_pb_service"
import grpcLibrary from "../grpctransport/grpc_pb"
import { useWindowSize, getWeigthName } from "../internal/helpersFunc"
import { animated, useSpring } from 'react-spring'
import * as d3 from 'd3-ease'

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const AutoLike = ({ grpcClient }: { grpcClient: GrpcServiceClient }) => {

  interface predictedList {
    id: number
    photos: string[]
    likePercent: number
    dislikePercent: number
  }

  const userList = useRef<predictedList[]>([])
  const userIndex = useRef(0)

  const [userArr, setUserArr] = useState<predictedList[]>([])
  const [tokenActual, setTokenActual] = useState(true)
  const [autoLikeSwitch, setAutoLikeSwitch] = useState(false)
  const [autoLikeSwitchDisable, setAutoLikeSwitchDisable] = useState(true)
  const [likedCount, setLikedCount] = useState(0)
  const [dislikedCount, setDislikedCount] = useState(0)
  const [successAutoLike, setSuccessAutoLike] = useState(true)
  const [weigthName, setWeigthName] = useState("")

  const autoLikeStream = useRef<ResponseStream<grpcLibrary.AutoLikeResponse>>(null)

  useEffect(() => {
    grpcClient.getToken(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err) {
        console.log(err)
      } else {
        setTokenActual(r.getActualtoken())
        setAutoLikeSwitchDisable(!r.getActualtoken())
      }
    })
    getWeigthName(grpcClient, setWeigthName)
    grpcClient.getAutoLikeIsRun(new grpcLibrary.GetAutoLikeIsRunResponse(), null, (err, r) => {
      setLikedCount(r.getLikedcount())
      setDislikedCount(r.getDislikedcount())
      if (r.getAutolikerun()) {
        setAutoLikeSwitch(r.getAutolikerun())
        streamAutoLike()
      }
    })
    return () => {
      if (autoLikeStream.current != null)
      autoLikeStream.current.cancel()
  };
  }, [])

  function streamAutoLike() {
    autoLikeStream.current = grpcClient.streamingAutoLike(new grpcLibrary.EmptyMessage(), null)
    autoLikeStream.current.on('data', function (r) {
      setSuccessAutoLike(r.getSuccessautolike())
      if (r.getSuccessautolike()) {
        if (userList.current.length > 5) {
          userList.current.pop()
        }
        userList.current.push({
          id: userIndex.current, photos: r.getPhotosList_asB64(),
          likePercent: Math.round((r.getLikepercent() + Number.EPSILON) * 100) / 100,
          dislikePercent: Math.round((r.getDislikepercent() + Number.EPSILON) * 100) / 100
        })
        userIndex.current++
        setUserArr(userList.current.slice())
      }
    })
  }

  function switchAutoLike() {
    if (!autoLikeSwitch) {
      setAutoLikeSwitchDisable(true)
      grpcClient.runAutoLike(new grpcLibrary.EmptyMessage(), null, () => {
        streamAutoLike()
        setAutoLikeSwitchDisable(false)
        setAutoLikeSwitch(!autoLikeSwitch)
      })
    } else {
      setAutoLikeSwitchDisable(true)
      grpcClient.stopAutoLike(new grpcLibrary.EmptyMessage(), null, () => {
        setAutoLikeSwitchDisable(false)
        setAutoLikeSwitch(!autoLikeSwitch)
        setSuccessAutoLike(true)
      })
    }
  }

  function onWheell(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
    if (ev.deltaY < 0) {
      apiObj.scrollNext();
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev();
    }
  }

  function PhotosToCard(props: { photos: string[] }) {
    if (useWindowSize().width < (200 + 20) * props.photos.length) {
      return <>
        <Box flexDirection='row' justifyContent='space-evenly' width="100vw">
          <ScrollMenu onWheel={onWheell}>
            {props.photos.map((photo: React.Key) =>
              <Box width='150px' height={(150 * 1.25 + 20).toString() + 'px'} mt='10px' ml='10px' mr='10px'>
                <img width='100%' key={photo} src={"data:image/png;base64, " + photo} style={{ borderRadius: '0.5rem' }} />
              </Box>
            )}
          </ScrollMenu>
        </Box>
      </>
    } else {
      return <>
        <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
          {props.photos.map((photo: React.Key) =>
            <Box width='200px' height={(200 * 1.25 + 20).toString() + 'px'} mt='10px' ml='10px' mr='10px'>
              <img width='100%' key={photo} src={"data:image/png;base64, " + photo} style={{ borderRadius: '0.5rem' }} />
            </Box>
          )}
        </Box>
      </>
    }
  }

  function PercentPhotoCard(props: { likePercent: number, dislikePercent: number }) {
    return <>
      <Box width='400px' display='flex' flexDirection='row' justifyContent='space-around' position='relative'>
        <Text fontWeight='bold' textColor='#ff4848'>{props.dislikePercent}%</Text>
        <Text fontWeight='bold' textColor={props.likePercent > props.dislikePercent ? '#22c35e' : '#ff4848'}>{props.likePercent > props.dislikePercent ? "LIKE" : "DISLIKE"}</Text>
        <Text fontWeight='bold' textColor='#22c35e'>{props.likePercent}%</Text>
      </Box>
    </>
  }

  function PhotosCard(props: { photos: string[], likePercent: number, dislikePercent: number }) {
    return <>
      <PhotosToCard photos={props.photos} />
      <PercentPhotoCard likePercent={props.likePercent} dislikePercent={props.dislikePercent} />
      <Divider />
    </>
  }

  function FadeSpinner() {
    const foneCardAnimation = useSpring({
      from: { opacity: switchAutoLike ? 0 : 1 },
      to: { opacity: autoLikeSwitch ? 1 : 0 },
      config: { duration: 1000, easing: d3.easeExpOut }
    })
    return <div>
      <animated.div style={foneCardAnimation}>
        <Spinner m='20px' size='xl' color='red' />
      </animated.div>
    </div>
  }
  return <>
    <Center flexDirection='column' justifyContent='space-evenly'>
      <Box display='flex'>
        <Popover isOpen={!tokenActual || weigthName == ""}>
          <PopoverTrigger>
            <Box m='20px' w='150px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
              <Text ml='10px' mt='20px' mr='10px' fontSize='sm'>Автолайк</Text>
              <Switch colorScheme='red' isDisabled={autoLikeSwitchDisable || weigthName == ""} isChecked={autoLikeSwitch} onChange={switchAutoLike} mr='15px' mt='16px' mb='15px' size='lg' />
            </Box>
          </PopoverTrigger>
          <PopoverContent bgColor='red.600' borderColor='red.600' >
            <PopoverArrow bgColor='red.600' />
            <PopoverHeader borderColor='red.600' textColor='white'>{weigthName == "" ? "Нейронная сеть не обучена" : "Токен не актуален"}</PopoverHeader>
            <PopoverBody borderColor='red.600'>
              <Text textColor='white'>{weigthName == "" ? "Обучите нейросеть" : "Обновите токен в настройках"}</Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <FadeSpinner />
        <Box m='20px' w='150px' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
          <Text ml='10px' mt='8px' mr='10px' fontSize='sm' textColor='#22c35e'>{"Liked: " + likedCount}</Text>
          <Text ml='10px' mr='10px' fontSize='sm' textColor='#ff4848'>{"Disliked: " + dislikedCount}</Text>
        </Box>
      </Box>
      <Divider />
      {!successAutoLike ?
        <>
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            width="350px"
            height="250px"
            mt='10px'
            mb='10px'
            borderRadius='lg'
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Опаньки! Юзеров больше нет
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              <Box>
                <Text mt='10px'>Попробуйте увеличить радиус поиска или диапазон возраста в приложении.</Text>
                <Text mt='10px'>Либо превышен лимит запросов за час, в этом случае оставьте все как есть, через время автолайк продолжит работу.</Text>
              </Box>
            </AlertDescription>
          </Alert>
          <Divider />
        </>
        : <></>}
      {userArr.slice().reverse().map((user) => <PhotosCard key={user.id} photos={user.photos} likePercent={user.likePercent} dislikePercent={user.dislikePercent} />)}
    </Center>

  </>
}

export default AutoLike
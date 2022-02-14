import React, { useEffect, useRef, useState } from 'react'
import { GrpcServiceClient } from "../grpctransport/grpc_pb_service"
import grpcLibrary from "../grpctransport/grpc_pb"
import {
  Center,
  Box,
  Button,
  Text,
  Progress,
} from '@chakra-ui/react'
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CopyIcon,
  RepeatClockIcon
} from '@chakra-ui/icons'
import { animated, useSpring } from 'react-spring'
import * as d3 from 'd3-ease'
import { useWindowSize, colorOfProgress, getPossibility, clearLastUserSwipe, getWeigthName } from "../internal/helpersFunc"
import SwipeCard from '../internal/SwipeCard'
import '../../styles/carousel.min.css'


const LearnNN = ({ grpcClient }: { grpcClient: GrpcServiceClient }) => {
  interface userInfo {
    cardId: number
    uid: number
    photos: string[]
  }

  const isTabFocus = useRef(true)
  const userList = useRef<userInfo[]>([])
  const userIndex = useRef(0)
  const swipedUsers = useRef(0)
  const swipedPhotos = useRef(0)
  const loadingUsers = useRef(false)
  const [showFoneCard, setShowFoneCard] = useState(false)

  const [cardArr, setCardArr] = useState<userInfo[]>([])
  const [countOfAllUsersFromDB, setCountOfAllUsersFromDB] = useState(0)
  const [countOfAllPhotosFromDB, setCountOfAllPhotosFromDB] = useState(0)
  const [countOfSwipedUsersFromDB, setCountOfSwipedUsersFromDB] = useState(0)
  const [countOfSwipedPhotosFromDB, setCountOfSwipedPhotosFromDB] = useState(0)
  const [progress, setProgress] = useState(0)
  const [weigthIsExist, setWeigthIsExist] = useState(false)
  const weigthIsExistRef = useRef(false)
  const [possibilityClearLastSwipes, setPossibilityClearLastSwipes] = useState(false)
  const [predictLike, setPredictLike] = useState(0.0)
  const [predictDislike, setPredictDislike] = useState(0.0)
  const [isDrag, setIsDrag] = useState(false) 
  const countOfLikePhotos = useRef(0)
  const countOfDislikePhotos = useRef(0)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    console.log("hidden")
    getLikeDislikeCountPhotosFromDB()
    getSwipedUsersInfoFromBack()
    getUsersFromBack(0, 5)
    getPossibility(grpcClient, setPossibilityClearLastSwipes, 1)
    getWeigthNameCycle()
    return () => {
      console.log("visible")
      document.body.style.overflow = 'visible'
      isTabFocus.current = false
    }
  }, [])

  function getLikeDislikeCountPhotosFromDB() {
    grpcClient.likeDislikeCountPhotosFromDB(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err == null) {
        countOfLikePhotos.current = r.getLikecount()
        countOfDislikePhotos.current = r.getDislikecount()
      }
    })
  }

  function getWeigthNameCycle() {
    if (!isTabFocus.current) return
    getWeigthName(grpcClient, undefined, weigthIsExistRef)
    if (!weigthIsExistRef.current) {
      setTimeout(() => { getWeigthNameCycle() }, 1000)
    } else {
      setWeigthIsExist(true)
      predictCard(userList.current[0].uid)
    }
  }

  function getSwipedUsersInfoFromBack() {
    grpcClient.getDownloadedInfoFromDB(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err == null) {
        setCountOfAllUsersFromDB(r.getNndatasetaccountscount())
        setCountOfSwipedUsersFromDB(r.getNndatasetswipedaccountscount())
        setCountOfSwipedPhotosFromDB(r.getNndatasetswipedphotoscount())
        setCountOfAllPhotosFromDB(r.getNndatasetcount())
        if (r.getNndatasetswipedaccountscount() == 0 && r.getNndatasetaccountscount() == 0) {
          setProgress(0)
        } else {
          setProgress((r.getNndatasetswipedaccountscount()) / r.getNndatasetaccountscount() * 100)
        }
      } else {
        console.log(err)
      }
    })
  }

  function getUsersFromBack(fromUserId: number, countOfUsers: number) {
    if (!loadingUsers.current) {
      loadingUsers.current = true
      const GetUsersRequest = new grpcLibrary.GetUsersRequest()
      GetUsersRequest.setFromuserid(fromUserId)
      GetUsersRequest.setCountofusers(countOfUsers)
      grpcClient.getUsers(GetUsersRequest, null, (err, response) => {
        if (err) {
          console.log(err)
        } else {
          response.getUsersList().forEach((user) => {
            userList.current.push({ cardId: userIndex.current, uid: user.getUserid(), photos: user.getPicList_asB64() })
            userIndex.current++
          })
          setCardArr(userList.current.slice(0, 3))
        }
        loadingUsers.current = false
        setShowFoneCard(true)
      })
    }
  }

  function likeDislikeUserToBack(uid: number, like: boolean) {
    const LikeDislikeRequest = new grpcLibrary.LikeDislikeRequest()
    LikeDislikeRequest.setUserid(uid)
    LikeDislikeRequest.setLikedislike(like)
    grpcClient.likeDislike(LikeDislikeRequest, null, (err, response) => {
      if (err) {
        console.log(err)
      }
    })
  }

  function swipe(swipeLocation: string, photosCount: number, idOnPage: number, uid: number) {
    swipedPhotos.current += photosCount
    userList.current = userList.current.filter((user) => { return user.cardId != idOnPage })
    if (userList.current.length > 0 && weigthIsExistRef.current) setTimeout(() => predictCard(userList.current[0].uid), 100)
    swipedUsers.current++
    setProgress((swipedUsers.current + countOfSwipedUsersFromDB) / countOfAllUsersFromDB * 100)
    if (swipeLocation == 'right') {
      countOfLikePhotos.current+=photosCount
      likeDislikeUserToBack(uid, true)
    }
    if (swipeLocation == 'left') {
      countOfDislikePhotos.current+=photosCount
      likeDislikeUserToBack(uid, false)
    }
    setCardArr(userList.current.slice(0, 3))
    if (userList.current.length < 5 && userList.current.length > 0) {
      getUsersFromBack(userList.current[userList.current.length - 1].uid, 3)
    }
    setPossibilityClearLastSwipes(true)
  }

  function predictCard(userId: number) {
    const predictUserRequest = new grpcLibrary.PredictUserRequest()
    predictUserRequest.setUserid(userId)
    grpcClient.predictUser(predictUserRequest, null, (err, r) => {
      setPredictLike(Math.round((r.getLikepercent() + Number.EPSILON) * 100) / 100)
      setPredictDislike(Math.round((r.getDislikepercent() + Number.EPSILON) * 100) / 100)
      console.log("userId:", userId, "Predict: like:", r.getLikepercent(), "dislike:", r.getDislikepercent())
    })
  }

  function FoneCard() {
    const foneCardAnimation = useSpring({
      from: { opacity: 0 },
      to: { opacity: 1 },

      config: { duration: 5000, easing: d3.easeExpOut }
    })
    const predictAnimation = useSpring({
      to: { opacity: isDrag ? 0 : 1 },
      from: { opacity: isDrag ? 1 : 0 },
      config: { duration: 1000, easing: d3.easeCubicOut }
    })
    if (userList.current.length == 0 && showFoneCard) {
      return <div>
        <animated.div style={foneCardAnimation}>
          <Box width='40vh' height='50vh' right='50%' bg='blackAlpha.300' borderWidth='5px' borderRadius='10px' borderColor='blackAlpha.400' opacity=''>
            <Center flexDirection='column'>
              <CopyIcon height='40vh' color='white' w='20%' h='20%' />
              <Text fontSize='medium' color='white' fontWeight='bold'>
                {progress >= 100 ? "Вы просвайпали все фотографии (:" : countOfAllUsersFromDB == 0 ? "Сначала загрузите фотографии :(" : "Что-то пошло не так..."}
              </Text>
            </Center>
          </Box>
        </animated.div>
      </div>
    } else {
      return <div style={{ opacity: !weigthIsExist ? 0.5 : 1 }}>
        <animated.div style={predictAnimation}>
          <Box h='50vh' w='40vh' />
          <Box h='50px' w='40vh'>
            <Box display='flex' >
              <Progress transform='rotate(180deg)' colorScheme='red' w='20vh' size='sm' value={predictDislike} borderRightRadius='lg' />
              <Progress colorScheme='whatsapp' w='20vh' size='sm' value={predictLike} borderRightRadius='lg' />
            </Box>
            <Box display='flex' textAlign='center'>
              <Text fontSize='medium' fontWeight='bold' textColor='#ff4848' w='100%'>{useWindowSize().width < 767 ? 'D' : 'DISLIKE'} {predictDislike}%</Text>
              <Text fontSize='medium' fontWeight='bold' w='100%'>{!weigthIsExist ? "Предсказание не работает, обучите нейросеть" : "Предсказание"}</Text>
              <Text fontSize='medium' fontWeight='bold' textColor='#22c35e' w='100%'>{useWindowSize().width < 767 ? 'L' : 'LIKE'} {predictLike}%</Text>
            </Box>
          </Box>
        </animated.div>
      </div>
    }
  }

  return <div style={{ overflow: 'hidden!' }} className='disableHighlight'>

    <Center flexDirection='column'>
      <Progress colorScheme={colorOfProgress(progress, 100)} value={progress} size='sm' width='100%' />
      <Box backgroundColor='gray.100' mb={useWindowSize().width < 767 ? '6%' : '2%'} borderBottomRadius='20px'>
        <Text mt='5px' mb='5px' ml='15px' mr='15px' fontSize='medium'>Аккаунты: {swipedUsers.current + countOfSwipedUsersFromDB}/{countOfAllUsersFromDB} {(progress).toFixed(2)}%</Text>
        <Text borderTop='solid' borderTopColor='black' borderTopWidth='1px' mt='5px' mb='5px' ml='15px' mr='15px' fontSize='medium'>Фотографии: {swipedPhotos.current + countOfSwipedPhotosFromDB}/{countOfAllPhotosFromDB}</Text>
        <Box display='flex' justifyContent='space-between' mb='5px' ml='15px' mr='15px'>
          <Text fontSize='medium' color='#ff4848' >Dislike: {countOfDislikePhotos.current}</Text>
          <Text fontSize='medium' color='#22c35e' >Like: {countOfLikePhotos.current}</Text>
        </Box>
      </Box>
      {useWindowSize().width < 767 ?
        <Box position='absolute' top='73vh' w='250px' display='grid' justifyContent='space-evenly'>
          <Button ml='10px' mb='10px' size="sm" variant='ghost' colorScheme='red' disabled={!possibilityClearLastSwipes}
            onClick={() => clearLastUserSwipe(grpcClient, setPossibilityClearLastSwipes, 1, true)}>
            <RepeatClockIcon />
            <Text ml='5px'>Откатить свайп</Text>
          </Button>
        </Box>
        :
        <Box position='absolute' top='73vh' w='250px' display='grid' justifyContent='space-evenly'>

          <Button ml='10px' mb='10px' size="sm" variant='ghost' colorScheme='red' disabled={!possibilityClearLastSwipes}
            onClick={() => clearLastUserSwipe(grpcClient, setPossibilityClearLastSwipes, 1, true)}>
            <RepeatClockIcon />
            <Text ml='5px'>Откатить свайп</Text>
          </Button>
          <Box display='block' w='170px' justifyContent='space-evenly' mb='10px'>
            <Center>
              <Text fontSize='small'>След.</Text>
            </Center>
            <Center>
              <Text fontSize='small'>фото</Text>
            </Center>
            <Center>
              <Box borderColor='white' borderWidth='3px' borderRadius='md' width='40px' height='40px' >
                <Center>
                  <ArrowUpIcon mt='21%' w={5} h={5} />
                </Center>
              </Box>
            </Center>
          </Box>

          <Box display='flex' w='170px' justifyContent='space-evenly'>

            <Box width='54px' display='block'>
              <Center>
                <Box borderColor='white' borderWidth='3px' borderRadius='md' width='40px' height='40px' >
                  <Center>
                    <ArrowBackIcon mt='21%' w={5} h={5} />
                  </Center>
                </Box>
              </Center>
              <Center>
                <Text fontSize='small' >Дизлайк</Text>
              </Center>
            </Box>

            <Box width='54px' display='block'>
              <Center>
                <Box borderColor='white' borderWidth='3px' borderRadius='md' width='40px' height='40px' >
                  <Center>
                    <ArrowDownIcon mt='21%' w={5} h={5} />
                  </Center>
                </Box>
              </Center>
              <Center>
                <Text fontSize='small'>Пред.</Text>
              </Center>
              <Center>
                <Text fontSize='small'>фото</Text>
              </Center>
            </Box>

            <Box width='54px' display='block'>
              <Center>
                <Box borderColor='white' borderWidth='3px' borderRadius='md' width='40px' height='40px' >
                  <Center>
                    <ArrowForwardIcon mt='21%' w={5} h={5} />
                  </Center>
                </Box>
              </Center>
              <Center>
                <Text fontSize='small' >Лайк</Text>
              </Center>
            </Box>
          </Box>

        </Box>
      }

      <Box width='40vh' right='50%' display='flex'>
        <FoneCard />
        {cardArr.slice().reverse().map((user) =>
          <SwipeCard key={user.cardId}
            onSwipe={(args) => { swipe(args[0], args[1], user.cardId, user.uid) }}
            onDragChange={(arg) => setIsDrag(arg)}
            userInfo={user}
            focusCard={cardArr[0].cardId}
          />)}
      </Box>
    </Center>
  </div>
}
export default LearnNN;
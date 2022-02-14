import React, { useEffect, useRef, useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Center,
  FormControl,
  FormLabel,
  Button,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  Progress,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  Tooltip
} from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'
import { useWindowSize } from "../internal/helpersFunc"
import { useSpring, animated } from 'react-spring'
import * as d3 from 'd3-ease'

import { GrpcServiceClient } from "../grpctransport/grpc_pb_service"
import grpcLibrary from "../grpctransport/grpc_pb"

const LoadTab = ({ grpcClient }: { grpcClient: GrpcServiceClient }) => {
  const [loaded, setLoaded] = useState(false)

  const [tokenActual, setTokenActual] = useState(true)
  const [photosCountField, setPhotosCountField] = useState(10)
  const [disabledCountField, setDisabledCountField] = useState(true)
  const [loading, setLoading] = useState(false) //
  const [loadingButton, setLoadingButton] = useState(false)
  const [disabledLoadButton, setDisabledLoadButton] = useState(true)

  const countOfNNDataSetFromDB = useRef(0)
  const countOfNNDataSetAccountsFromDB = useRef(0)
  const countOfAccountsFromDB = useRef(0)
  const countOfPhotosFromDB = useRef(0)

  const [countOfNNDataSet, setCountOfNNdataSet] = useState(0)
  const [countOfNNDataSetAccounts, setCountOfNNDataSetAccounts] = useState(0)
  const [countOfAccounts, setCountOfAccounts] = useState(0)
  const [countOfPhotos, setCountOfPhotos] = useState(0)

  const [loadingPercent, setLoadingPercent] = useState(0)

  const [accountsNewCount, setAccountsNewCount] = useState(0)
  const [accountsUpdateCount, setAccountsUpdateCount] = useState(0)
  const [accountsSameCount, setAccountsSameCount] = useState(0)

  const [photosNowCount, setPhotosNowCount] = useState(0)
  const [photosDownloadedCount, setPhotosDownloadedCount] = useState(0)
  const [photosSameCount, setPhotosSameCount] = useState(0)
  const [photosMissingCount, setPhotosMissingCount] = useState(0)
  const [errPhotosCount, setErrPhotosCount] = useState(0)
  const [NNDataSetCount, setNNDataSetCount] = useState(0)

  const [truePhoto, setTruePhoto] = useState("")
  const [falsePhoto, setFalsePhoto] = useState("")

  const [successDownload, setSuccessDownload] = useState(true)
  const [runDownload, setRunDownload] = useState(false)

  const oneTimePlay = useRef(false)
  
  useEffect(() => {
    grpcClient.getToken(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err) {
        console.log(err)
      } else {
        setTokenActual(r.getActualtoken())
        setDisabledLoadButton(!r.getActualtoken())///
        getDownloadedInfoFromDB()///
      }
    })
  }, [])

  function getDownloadedInfoFromDB() {
    const getDownloadedInfoFromDBRequest = new grpcLibrary.EmptyMessage()

    grpcClient.getDownloadedInfoFromDB(getDownloadedInfoFromDBRequest, null, (err, r) => {
      if (err == null) {
        setCountOfNNdataSet(r.getNndatasetcount())
        setCountOfNNDataSetAccounts(r.getNndatasetaccountscount())
        setCountOfAccounts(r.getDownloadedaccountscount())
        setCountOfPhotos(r.getDownloadedphotoscount())
        countOfNNDataSetFromDB.current = r.getNndatasetcount()
        countOfNNDataSetAccountsFromDB.current = r.getNndatasetaccountscount()
        countOfAccountsFromDB.current = r.getDownloadedaccountscount()
        countOfPhotosFromDB.current = r.getDownloadedphotoscount()
        setRunDownload(r.getRundownload())
        console.log(r.getRundownload())
        if (r.getRundownload()) {
          setDisabledCountField(true)
          setLoadingButton(true)
          runDownloadInfoStream()
          runLoadingPhotosStream()
        } else {
          setDisabledCountField(false)
          setLoadingButton(false)
        }
        setLoaded(true)
        oneTimePlay.current = true

      } else {
        console.log(err)
      }
    })
  }

  function setPhotosCountToDownload(value: string) {
    var intValue = 0
    if (value != "") {
      intValue = parseInt(value)
    }
    if (intValue > 0 && intValue.toString().length == value.length) {
      setDisabledLoadButton(false)
      setPhotosCountField(intValue)
      console.log(intValue)
    } else {
      setDisabledLoadButton(true)
    }
  }

  function runDownloadInfoStream() {
    setLoading(true)
    var downloadInfoStream = grpcClient.streamingDownloadInfo(new grpcLibrary.EmptyMessage(), null)
    downloadInfoStream.on('data', function (r) {
      setLoadingPercent(r.getMatchingnnphotoscount() / photosCountField * 100)
      setAccountsNewCount(r.getNewaccounts())
      setAccountsUpdateCount(r.getUpdateaccounts())
      setAccountsSameCount(r.getSameaccounts())

      setPhotosNowCount(r.getPhotosnow())
      setPhotosDownloadedCount(r.getCountofdownloadedphotos())
      setPhotosSameCount(r.getCountofsamephotos())
      setPhotosMissingCount(r.getCountofmissingphotos())
      setErrPhotosCount(r.getErrphotoscount())
      setNNDataSetCount(r.getMatchingnnphotoscount())

      setSuccessDownload(r.getSuccessdownload())////
      setRunDownload(r.getRundownload())

      setCountOfNNdataSet(countOfNNDataSetFromDB.current + r.getMatchingnnphotoscount())
      setCountOfNNDataSetAccounts(countOfNNDataSetAccountsFromDB.current + r.getMatchingaccounts())
      setCountOfAccounts(countOfAccountsFromDB.current + r.getNewaccounts())
      setCountOfPhotos(countOfPhotosFromDB.current + r.getPhotosnow())

      if (!r.getRundownload()) {
        getDownloadedInfoFromDB()
        setDisabledLoadButton(false)
        setDisabledCountField(false)
        setLoadingButton(false)
        setSuccessDownload(true)
        setLoading(false)
      }
    })
    downloadInfoStream.on('end', function () {
      if (runDownload) {
        setTimeout(() => { runDownloadInfoStream() }, 1000)
      }
    })


  }

  function runLoadingPhotosStream() {
    var loadingPhotosStream = grpcClient.streamingGetLoadingPhotos(new grpcLibrary.EmptyMessage(), null)
    loadingPhotosStream.on('data', function (r) {
      if (r.getTruenew()) {
        setTruePhoto(r.getTruephoto_asB64())
      }
      if (r.getFalsenew()) {
        setFalsePhoto(r.getFalsephoto_asB64())
      }
    })
    loadingPhotosStream.on('end', function () {
      if (runDownload) {
        setTimeout(() => { runLoadingPhotosStream() }, 1000)
      }
    })
  }

  function startStopDownload() {
    if (!runDownload) {
      const setDownloadPhotos = new grpcLibrary.SetDownloadPhotosRequest()
      setDownloadPhotos.setPhotoscount(photosCountField)
      setDisabledCountField(true)
      grpcClient.setDownloadPhotos(setDownloadPhotos, null, (err, r) => {
        if (err == null) {
          if (r.getSuccessrun() && r.getNnservicerun()) {
            setLoadingButton(true)
            runDownloadInfoStream()
            runLoadingPhotosStream()
          }
        } else {
          setLoadingButton(false)
          setDisabledCountField(false)
          setDisabledLoadButton(false)
          console.log("ERROR: GRPC startDownload")
        }
      })
    } else {
      setDisabledLoadButton(true)
      grpcClient.stopDownload(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      })
    }
  }

  function NNDataSetTooltip() {
    return <div>
      <Tooltip borderRadius='lg' hasArrow bg='red.600' label="Neural Network Data Set - Фотографии прошедшие обработку, годные для обучения нейронный сети. 
      То есть - с одним распознанным, отлично видным лицом (фото с 2 и более лицами отсеиваются, для упрощения формирования DataSet'а. Ибо не хватало еще и тыкать на интересующее тебя лицо.). 
      Статистика количества лиц на фото, на 2022й год: 0: 29%, 1: 67%, >1: 4%. 
      Фотографии скачиваются относительно этого числа. ">
        <Box display='flex'>
          <Text>NNDataSet фото</Text>
          <QuestionIcon ml='5px' mr='5px' color='red.500' />
        </Box>
      </Tooltip>
    </div>
  }

  function LoadProgress() {
    
    const animation = useSpring({
      to: { y: loading ? 0 : 200, opacity: !loaded ? 0 : loading ? 1 : 0.3 },
      from: { y: loading ? 200 : 0, opacity: !oneTimePlay.current ? 0 : loading ? 0.3 : 1 },
      config: { duration: 600, easing: d3.easeCubicOut }
    })
    return <div>
      <animated.div style={animation}>
        <Center m='30px' flexDirection='column' w='90%'>
          <Box w='90%' borderRadius='lg' shadow='0px 20px 50px 0px rgba(0,0,0,0.7)'>
            <Alert variant='solid' status={loadingPercent >= 100 ? 'success' : 'info'} borderTopRadius='lg'>
              <AlertIcon />
              {/* {loadingAccountsDescription} */}
              <Text fontSize='medium'>NNDataSet: {NNDataSetCount}/{photosCountField} {loadingPercent.toFixed(2)}%</Text>
            </Alert>
            <Progress colorScheme={loadingPercent >= 50 ? loadingPercent >= 75 ? 'whatsapp' : 'yellow' : loadingPercent >= 25 ? 'orange' : 'red'}
               value={loadingPercent} size='sm' borderBottomRadius='lg' />
          </Box>
          <Box  mt='1%' w='100%' display='flex' alignItems='center' flexDirection={useWindowSize().width < 767 ? 'column' : 'row'} justifyContent='space-evenly'>
            <Box mb='10px' mt='10px' w='182px' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.7)'>
              <StatGroup textColor='black'>
                <Stat m='10px'>
                  <Center>
                    <StatLabel fontSize='medium'>Аккаунты</StatLabel>
                  </Center>
                  <List mt='5px'>
                    <ListItem>Новые: {accountsNewCount}</ListItem>
                    <ListItem>Обновленные: {accountsUpdateCount}</ListItem>
                    <ListItem>Одинаковые: {accountsSameCount}</ListItem>
                  </List>
                </Stat>
              </StatGroup>
            </Box>

            <Box w='360px' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.7)'>
              <StatGroup textColor='black'>
                <Stat m='10px'>
                  <Center>
                    <StatLabel fontSize='medium'>Фотографии</StatLabel>
                  </Center>
                  <Center>
                    <Box display='flex'>
                      <List mt='5px' mr='10px'>
                        <ListItem>Все: {photosNowCount}</ListItem>
                        <ListItem>Новые: {photosDownloadedCount}</ListItem>
                        <ListItem>Одинаковые: {photosSameCount}</ListItem>
                      </List>
                      <List mt='5px' ml='10px'>
                        <ListItem>NNDataSet: {NNDataSetCount}</ListItem>
                        <ListItem>Удаленные: {photosMissingCount}</ListItem>
                        <ListItem>Ошибка/Видео: {errPhotosCount}</ListItem>
                      </List>
                    </Box>
                  </Center>
                </Stat>
              </StatGroup>
            </Box>
          </Box>

          <Center>
            <Box mt='3%' w='100%' display='flex' justifyContent='space-evenly' flexDirection='row' flexWrap='wrap'>
              <Box mt='3%' opacity={falsePhoto.length > 0 ? 1 : 0} position='relative' width={useWindowSize().width < 767 ? '60%' : '35%'}>
                <Text pointerEvents='none'
                  transform='rotate(315deg)'
                  top='22px'
                  left='-32px'
                  position='absolute'
                  width='128px'
                  borderWidth='1px'
                  borderColor='#ff4848'
                  borderRadius='md'
                  padding='1px 10px 1px 10px'
                  color='#ff4848'
                  fontSize='small'
                  fontWeight='bold' >Не подходящие</Text>
                <img style={{ borderRadius: '7px', boxShadow: '0px 20px 50px 0px #190707' }} key={falsePhoto} src={"data:image/png;base64, " + falsePhoto} />
              </Box>

              <Box mt='3%' opacity={truePhoto.length > 0 ? 1 : 0} position='relative' width={useWindowSize().width < 767 ? '60%' : '35%'}>
                <Text pointerEvents='none'
                  transform='rotate(45deg)'
                  width='110px'
                  top='12px'
                  right='-30px'
                  position='absolute'
                  borderWidth='1px'
                  borderColor='#01df8a'
                  borderRadius='md'
                  padding='1px 10px 1px 10px'
                  color='#01df8a'
                  fontSize='small'
                  fontWeight='bold'>Подходящие</Text>
                <img style={{ borderRadius: '7px', boxShadow: '0px 20px 50px 0px #00160d' }} key={truePhoto} src={"data:image/png;base64, " + truePhoto} />
              </Box>
            </Box>
          </Center>

        </Center>
      </animated.div>
    </div>
  }

    return <>
      <Center flexDirection={useWindowSize().width < 767 ? 'column' : 'row'} justifyContent='space-evenly'>
        <Box >
          <Center>
            <Popover isOpen={!tokenActual}>
              <PopoverTrigger>
                <Box minW='200px' w='310px' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
                  <FormControl >
                    <FormLabel mt='10px' ml='10px'>Количество NNDataSet на загрузку</FormLabel>
                    <NumberInput w='95%' ml='10px' mb='10px' size="md" inputMode='numeric' defaultValue={photosCountField} min={1} max={20000} step={100} isDisabled={disabledCountField}>
                      <NumberInputField
                        pr="4.5rem"
                        min={1}
                        onChange={(e) => { setPhotosCountToDownload(e.target.value) }}
                      />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Box alignItems='baseline' d='inline-flex'>
                      <Button ml='10px' mb='10px' size="sm" loadingText='Стоп'
                        isLoading={loadingButton} disabled={disabledLoadButton}
                        onClick={startStopDownload}
                      >Загрузить фотографии</Button>
                    </Box>
                  </FormControl>
                </Box>
              </PopoverTrigger>
              <PopoverContent bgColor='red.600' borderColor='red.600' >
                <PopoverArrow bgColor='red.600' />
                <PopoverHeader borderColor='red.600' textColor='white'>Токен не актуален</PopoverHeader>
                <PopoverBody borderColor='red.600'>
                  <Text textColor='white'>Обновите токен в настройках</Text>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Center>
        </Box>

        {!successDownload ?
          <Alert
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            width="350px"
            height="350px"
            mt='3%'
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
                <Text mt='10px'>Либо превышен лимит запросов за час, в этом случае оставьте все как есть, через время загрузка продолжится сама.</Text>

              </Box>
            </AlertDescription>
          </Alert>
          : <></>}
        <Box >
          <Center>
            <Box mt='3%' w='203px' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
              <Text m='10px' >Локальная база данных</Text>
              <StatGroup m='10px' d='inline-flex' flexDirection='column'>

                <Stat>
                  <NNDataSetTooltip />
                  <StatNumber>{countOfNNDataSet}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>NNDataSet профили</StatLabel>
                  {countOfNNDataSetAccounts}
                </Stat>
                <Stat>
                  <StatLabel>Все фото</StatLabel>
                  {countOfPhotos}
                </Stat>
                <Stat>
                  <StatLabel>Все профили</StatLabel>
                  {countOfAccounts}
                </Stat>
              </StatGroup>
            </Box>
          </Center>
        </Box>
      </Center>

      {LoadProgress()}

    </>
}

export default LoadTab;
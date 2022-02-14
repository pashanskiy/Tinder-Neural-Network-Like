import React, { useEffect, useRef, useState } from 'react';
import {
  FormControl,
  Center,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Switch,
  Text,
  Progress,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  NumberInput,
  NumberInputField,
  Tooltip,
  useDisclosure,
  Divider,
  Link
} from '@chakra-ui/react'
import {
  ViewIcon,
  ViewOffIcon,
  DeleteIcon,
  SpinnerIcon,
  QuestionIcon,
  ExternalLinkIcon
} from '@chakra-ui/icons'
import { GrpcServiceClient } from "../grpctransport/grpc_pb_service"
import grpcLibrary from "../grpctransport/grpc_pb"
import { colorOfProgress, getPossibility, clearLastUserSwipe, getWeigthName, useWindowSize } from "../internal/helpersFunc"


const SettingsTab = ({ grpcClient }: { grpcClient: GrpcServiceClient }) => {
  const [tokenField, setTokenField] = useState("");
  const [showTokenActual, setShowTokenActual] = useState(false)
  const [tokenActual, setTokenActual] = useState(false)
  const [switchDrawBoxDisable, setSwitchDrawBoxDisable] = useState(true)
  const [drawBoxSwitch, setDrawBoxSwitch] = useState(false)
  const [switchPassOrIgnoreDisable, setSwitchPassOrIgnoreDisable] = useState(true)
  const [passOrIgnoreSwitch, setPassOrIgnoreSwitch] = useState(false)
  const [possibilityClearLastSwipes, setPossibilityClearLastSwipes] = useState(false)
  const [switchAlignDSDisable, setSwitchAlignDSDisable] = useState(true)

  const countOfLikePhotos = useRef(0)
  const countOfDislikePhotos = useRef(0)
  const closeTabRef = useRef(false)

  const tokenTutorialVideo = useRef("")

  useEffect(() => {
    const drawBoxRequest = new grpcLibrary.DrawBoxRequest()
    drawBoxRequest.setSet(false)
    grpcClient.drawBox(drawBoxRequest, null, (err, r) => {
      if (err != null) {
        console.log(err)
      } else {
        setDrawBoxSwitch(r.getBoolean())
        setSwitchDrawBoxDisable(false)
        getPosibilityAlignDS()
      }
    })

    const passOrIgnoreRequest = new grpcLibrary.PassOrIgnoreRequest()
    passOrIgnoreRequest.setSet(false)
    grpcClient.passOrIgnore(passOrIgnoreRequest, null, (err, r) => {
      if (err != null) {
        console.log(err)
      } else {
        setPassOrIgnoreSwitch(r.getPass())
        setSwitchPassOrIgnoreDisable(false)
      }
    })

    grpcClient.getToken(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err != null) {
        console.log(err)
      } else {
        setTokenField(r.getToken())
        setTokenActual(!r.getActualtoken())
        setShowTokenActual(true)
      }
    })

    getPossibility(grpcClient, setPossibilityClearLastSwipes, 5)
    getIsTrainingNow()

    grpcClient.getTokenTutorial(new grpcLibrary.EmptyMessage, null, (err, r) => {
      if (err != null) {
        console.log(err)
      } else {
        tokenTutorialVideo.current = r.getTokentutorial_asB64()
      }
    })

    return () => {
      closeTabRef.current = true
    }
  }, [])

  function getPosibilityAlignDS() {
    grpcClient.likeDislikeCountPhotosFromDB(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err == null) {
        countOfLikePhotos.current = r.getLikecount()
        countOfDislikePhotos.current = r.getDislikecount()
        if (countOfLikePhotos.current == 0 || countOfDislikePhotos.current == 0) {
          setSwitchAlignDSDisable(true)
          setAlignDSSwitch(false)
        } else {
          setSwitchAlignDSDisable(false)
        }

        if (countOfLikePhotos.current == countOfDislikePhotos.current) {
          setSwitchAlignDSDisable(true)
          setAlignDSSwitch(false)
        } else {
          setSwitchAlignDSDisable(false)
        }

        if (countOfLikePhotos.current + countOfDislikePhotos.current < 6) {
          setDisabledTrainButton(true)
        }

      } else {
        console.log(err)
      }
    })
  }

  const [btnLoad, setBtnLoad] = useState(false)

  function sendToken() {
    setBtnLoad(true)
    const SetTokenRequest = new grpcLibrary.SetTokenRequest()
    SetTokenRequest.setToken(tokenField)
    grpcClient.setToken(SetTokenRequest, null, (err, response) => {
      if (err != null) console.log(err)
      else {
        setTokenActual(!response.getActualtoken())
        setShowTokenActual(true)
        setBtnLoad(false)
      }
    })
  }

  function sendSwitchDrawBox(e: React.ChangeEvent<HTMLInputElement>) {
    setDrawBoxSwitch(!drawBoxSwitch)
    const drawBoxRequest = new grpcLibrary.DrawBoxRequest()
    drawBoxRequest.setSet(true)
    drawBoxRequest.setDrawbox(!drawBoxSwitch)
    grpcClient.drawBox(drawBoxRequest, null, (err, r) => {
      if (err != null) {
        console.log(err)
      }
    })
  }

  function sendSwitchPassOrIgnore(e: React.ChangeEvent<HTMLInputElement>) {
    setPassOrIgnoreSwitch(!passOrIgnoreSwitch)
    const passOrIgnoreRequest = new grpcLibrary.PassOrIgnoreRequest()
    passOrIgnoreRequest.setSet(true)
    passOrIgnoreRequest.setPass(!passOrIgnoreSwitch)
    grpcClient.passOrIgnore(passOrIgnoreRequest, null, (err, r) => {
      if (err != null) {
        console.log(err)
      }
    })
  }

  function clearAllLikes() {
    grpcClient.deleteAllLikes(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err != null) console.log(err)
      clearAllAlert.onClose()
    })
  }

  function deleteAllInfo() {
    setIsDeleting(true)
    grpcClient.permanentlyDeleteAllInfo(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err != null) console.log(err)
      deleteAllInfoAlert.onClose()
      setIsDeleting(false)
    })
  }

  const allEpochCount = useRef(0)
  const allBatchCount = useRef(0)

  const [epochNow, setEpochNow] = useState(0)
  const [batchNow, setBatchNow] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const [showPass, setShowPass] = useState(false)

  const clearAllAlert = useDisclosure()
  const clearAllAlertCancelRef = React.useRef()

  const retrainAlert = useDisclosure()
  const retrainAlertCancelRef = React.useRef()

  const deleteAllInfoAlert = useDisclosure()
  const deleteAllInfoAlertCancelRef = React.useRef()

  const tokenTutorial = useDisclosure()
  const tokenTutorialCancelRef = React.useRef()

  const infoAlert = useDisclosure()
  const infoAlertCancelRef = React.useRef()

  const [countOfEpochs, setCountOfEpochs] = useState(2)
  const [alignDSSwitch, setAlignDSSwitch] = useState(true)
  const [trainingNow, setTrainingNow] = useState(false)
  const [timeToEnd, setTimeToEnd] = useState("00")
  const [disabledTrainButton, setDisabledTrainButton] = useState(true)
  const [weigthName, setWeigthName] = useState("kek")

  function checkCountOfEpochs(value: number) {
    if (value > 0 && value < 1001) {
      setDisabledTrainButton(false)
      setCountOfEpochs(value)
    } else {
      setDisabledTrainButton(true)
    }
    if (countOfLikePhotos.current + countOfDislikePhotos.current < 6) {
      setDisabledTrainButton(true)
    }

  }

  function startTrain() {
    retrainAlert.onClose()
    setTrainingNow(true)
    setWeigthName("Ждем...")
    const trainRequest = new grpcLibrary.TrainRequest()
    trainRequest.setCountofepochs(countOfEpochs)
    trainRequest.setAlignds(alignDSSwitch)
    grpcClient.startTrain(trainRequest, null, (err, r) => {
      if (err != null) {
        console.log(err)
      }
      allEpochCount.current = r.getAllepochcount()
      if (r.getAllbatchcount() == 0) {
        allBatchCount.current = 1
      } else {
        allBatchCount.current = r.getAllbatchcount()
      }
      trainProcessStream()
    })
  }

  function trainProcessStream() {
    var streamingTrainStatus = grpcClient.streamingTrainStatus(new grpcLibrary.EmptyMessage(), null)
    var last100ResponsesTime: number[] = []
    var stopWatch = 0
    var lastEpoch = -1
    var lastBatch = -1
    stopWatch = new Date().getTime()
    streamingTrainStatus.on('data', function (r) {
      if (closeTabRef.current) {
        streamingTrainStatus.cancel()
        return
      }
      if (lastBatch != r.getBatch() || lastEpoch != r.getEpoch()) {
        last100ResponsesTime.push(new Date().getTime() - stopWatch)
        lastEpoch = r.getEpoch()
        lastBatch = r.getBatch()
        if (last100ResponsesTime.length > 5) {
          last100ResponsesTime.shift()
        }
        var middleTime = 0
        last100ResponsesTime.forEach(t => {
          middleTime += t
        })
        middleTime /= last100ResponsesTime.length
        var time = ((allBatchCount.current * allEpochCount.current) - (r.getBatch() + (r.getEpoch() * allBatchCount.current))) * middleTime
        if (time < 0) time = 0
        setTimeToEnd(new Date(time).toISOString().substr(11, 8))
        setEpochNow(r.getEpoch() + 1)
        setBatchNow(r.getBatch() + 1)
        stopWatch = new Date().getTime()
      }

    })
    streamingTrainStatus.on('end', function () {
      setTrainingNow(false)
      setDisabledTrainButton(false)
      getWeigthName(grpcClient, setWeigthName)
    })
  }

  function getIsTrainingNow() {
    grpcClient.getTrainingNow(new grpcLibrary.EmptyMessage(), null, (err, r) => {
      if (err != null) {
        console.log(err)
      }
      if (r.getTrainingnow()) {
        allEpochCount.current = r.getAllepochcount()
        allBatchCount.current = r.getAllbatchcount()
        setTrainingNow(true)
        setWeigthName("Ждем...")
        trainProcessStream()
        setDisabledTrainButton(true)
      } else {
        setDisabledTrainButton(false)
        getWeigthName(grpcClient, setWeigthName)
      }
    })
  }

  return <div>
    {/* {'Разрешение экрана: ' + useWindowSize().width + "x" + useWindowSize().height} */}
    <Center flexDirection='column' justifyContent='space-evenly'>
      <Box m='20px' width='354px' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <FormControl isInvalid={showTokenActual}>
          <Box display='flex' justifyContent='space-between' mt='10px' ml='10px' >
            <Text mr='10px'>Токен</Text>

            <Button colorScheme='red' mr='10px' variant='link' size='sm' onClick={tokenTutorial.onOpen}>
              <Text>Где взять токен?</Text>
            </Button>

            <AlertDialog
              size='xl'
              motionPreset="slideInBottom"
              leastDestructiveRef={tokenTutorialCancelRef}
              onClose={tokenTutorial.onClose}
              isOpen={tokenTutorial.isOpen}
              closeOnEsc={true}
              closeOnOverlayClick={true}
              isCentered>
              <AlertDialogOverlay />
              <AlertDialogContent >
                <AlertDialogHeader>{"Где взять токен?"}</AlertDialogHeader>
                <AlertDialogBody>
                  <Box >
                    <video src={'data:video/mp4;base64,' + tokenTutorialVideo.current} autoPlay={true} loop={true} />
                    <Text mb='2%' mt='5%'>Нажмите правой кнопкой мыши в любом месте на окне тиндера</Text>
                    <Text mb='2%'>Выберите "Просмотреть код"</Text>
                    <Text mb='2%'>Справа вверху перейдите на вкладку "Application"</Text>
                    <Text mb='2%'>Слева в колонке "Storage" нажмите на "Local Storage" и выберите "https://tinder.com"</Text>
                    <Text mb='2%'>В открывшейся таблице в поле "TinderWeb/APIToken" и хранится ваш токен.</Text>
                  </Box>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button colorScheme="red" ml={3} onClick={() => tokenTutorial.onClose()} isDisabled={isDeleting}>
                    Ясно, закрыть
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Box>
          <InputGroup w='95%' ml='10px' mb='10px' size="md">
            <Input
              isInvalid={tokenField.length == 0 ? true : false}
              fontSize='small'
              type={showPass ? "text" : "password"}
              placeholder="Введите токен"
              value={tokenField}
              onChange={(e) => { setTokenField(e.target.value) }}
            />
            <InputRightElement >
              <Button h="1.75rem" mr='5px' size="sm" onClick={() => setShowPass(!showPass)}>
                {showPass ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Box alignItems='baseline' d='inline-flex'>
            <Button ml='10px' mb='10px' size="sm" loadingText='кек)' isLoading={btnLoad} onClick={sendToken}>Задать токен</Button>
            <FormErrorMessage ml='10px' mb='10px' textColor={tokenActual ? 'red.500' : 'green.500'}>{tokenActual ? "Токен не актуален" : "Токен актуален"}</FormErrorMessage>
          </Box>
        </FormControl>
      </Box>

      <Box m='20px' w='350px' d='flex' position='relative' flexDirection='column' justifyContent='space-evenly' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Box opacity={trainingNow ? '100%' : '30%'} m='10px'>
          <Text fontSize='medium' fontWeight='bold'>Epoch: {epochNow}/{allEpochCount.current}</Text>
          <Progress colorScheme={colorOfProgress(epochNow, allEpochCount.current)} value={epochNow} max={allEpochCount.current} size='sm' width='100%' borderRadius='lg' />
          <Text fontSize='medium' fontWeight='bold'>Batch: {batchNow}/{allBatchCount.current}</Text>
          <Progress colorScheme={colorOfProgress(batchNow, allBatchCount.current)} value={batchNow} max={allBatchCount.current} size='sm' width='100%' borderRadius='lg' />
        </Box>
        <Box display='flex'>
          <Text ml='10px'>{'Вес: ' + weigthName == "" ? "Нету :( обучите" : weigthName}</Text>
          <Tooltip borderRadius='lg' hasArrow bg='red.600' label='Загруженный вес нейронной сети. 
          E: Эпоха, VL: Validate Loss (Размер ошибки), VA: Validate Accuracy (Точность).
          Validate- Тестовый датасет.
          Если написано "Нету :( обучите", тогда обучите, чтобы было)0))00)
          Если вес есть, то на вкладке обучения появится среднее предсказание по всем фотографиям карточки в режиме реального времени, так можно оценить точность работы.'>
            <QuestionIcon color='red.500' ml='5px' w={5} h={5} />
          </Tooltip>
        </Box>
        <Button colorScheme='red' m='10px' size='sm' isLoading={trainingNow} loadingText={'Обучится через: ' + timeToEnd} spinnerPlacement='end' onClick={retrainAlert.onOpen}>

          <Box display='flex' flexDirection='row' justifyContent='space-evenly'>
            <Text fontSize='medium' fontWeight='bold'>Обучить нейросеть</Text>
            <SpinnerIcon ml='10px' mt='3px' />
          </Box>
        </Button>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={retrainAlertCancelRef}
          onClose={retrainAlert.onClose}
          isOpen={retrainAlert.isOpen}
          isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>{"Обучить?"}</AlertDialogHeader>
            <AlertDialogBody>

              <Box>
                <Text mb='5px'>Переобучение нейронной сети в несколько эпох со случайным перемешиванием датасета</Text>
                <Text mb='5px'>После обучения будет выбрана лучшая эпоха, остальные будут удалены</Text>
                <Text mb='5px'>Рекомендую ставить от 10 до 100 в зависимости от размера датасета</Text>
                <Text mb='5px'>на 10000 фотографий в среднем лучшая эпоха была в промежутке от 15 до 30 (выбирается автоматически после обучения)</Text>
                <Text mb='5px'>Для работы предсказаний на вкладке "Обучение нейронной сети" можно использовать и малое число эпох</Text>
                <Text color='red'>В зависимоти от количества эпох зависит время обучения, ОНО БУДЕТ ДОЛГИМ!</Text>

                <Box ml='10px' mt='10px' mb='15px' w='300px' d='flex' position='relative' borderWidth='1px' borderRadius='lg'>
                  <Text mt='10px' ml='10px' >
                    Количество эпох для обучения
                  </Text>
                  <Box mt='10px' mr='10px'>
                    <NumberInput w='100px' ml='10px' mb='10px' size="md" inputMode='numeric' defaultValue={countOfEpochs} min={1} max={1000}>
                      <NumberInputField
                        min={1}
                        value={countOfEpochs}
                        onChange={(e) => { checkCountOfEpochs(+e.target.value) }}
                      />
                    </NumberInput>
                  </Box>
                </Box>

                <Divider mb='10px' color='black' />
                <Text mb='5px'>Выравнивание датасета "вырезает" фотографии из большей категории</Text>
                <Text mb='5px'>Т.Е. было 15000 в лайке и 20000 в дизлайке, станет 15000 в лайке и 15000 в дизлайке</Text>
                <Text mb='5px'>Важно для более грамотной сети, процент точности при этом будет ниже, но правдивее</Text>
                <Text mb='5px' color='red'>Лучше не трогать и оставить включенным!</Text>
                <Text>Фотографии на данный момент: </Text>

                <Text>Лайк: {countOfLikePhotos.current} Дизлайк: {countOfDislikePhotos.current}</Text>

                <Box ml='10px' mt='10px' w='270px' d='flex' position='relative' borderWidth='1px' borderRadius='lg'  >
                  <Text mt='12px' ml='10px' mr='10px' >
                    Выравнивание датасета
                  </Text>
                  <Switch colorScheme='red' isChecked={alignDSSwitch} isDisabled={switchAlignDSDisable} onChange={() => { setAlignDSSwitch(!alignDSSwitch) }} mr='10px' mt='10px' mb='10px' size='lg' />
                </Box>

              </Box>

            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={retrainAlertCancelRef} onClick={retrainAlert.onClose}>
                Отмена
              </Button>
              <Button colorScheme="red" ml={3} disabled={disabledTrainButton} onClick={startTrain}>
                Обучить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>

      <Box m='20px' w='321px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Text m='15px' fontSize='sm' >
          Отрисовывать распознанные области на фотографиях
        </Text>
        <Switch colorScheme='red' isDisabled={switchDrawBoxDisable} isChecked={drawBoxSwitch} onChange={sendSwitchDrawBox} mr='15px' mt='24px' mb='15px' size='lg' />
      </Box>

      <Box m='20px' w='321px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Text m='15px' fontSize='sm' >
          Отсылать запрос на дизлайк пользователя?
        </Text>

        <Box>
          <Tooltip borderRadius='lg' hasArrow bg='red.600' label='Если отключено, то со временем останутся только проигнорированные юзеры, которые будут в "вечном" цикле попадать в автолайк.
          Все проигнорированные юзеры ОСТАНУТСЯ в оригинальном приложении и вы сможете их ЛИЧНО просвайпать. Так же, насколько мне известно, в этом случае ваш приоритет будет существенно занижен.
          Ибо для системы вы будете выглядеть, как глэк, который всех подряд лайкает никого не дизлайкая.'>
            <Box display='flex'>
              <QuestionIcon color='red.500' ml='45px' w={5} h={5} />
            </Box>
          </Tooltip>
          <Switch colorScheme='red' isDisabled={switchPassOrIgnoreDisable} isChecked={passOrIgnoreSwitch} onChange={sendSwitchPassOrIgnore} mr='15px' mt='5px' mb='15px' size='lg' />
        </Box>
      </Box>

      <Box m='20px' w='291px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Text m='15px' fontSize='sm' >
          Откатить последние 5 свайпов
        </Text>
        <Button colorScheme='red' mr='10px' mt='10px' mb='10px' size='sm' onClick={() => clearLastUserSwipe(grpcClient, setPossibilityClearLastSwipes, 5, false)} isDisabled={!possibilityClearLastSwipes} >
          <DeleteIcon />
        </Button>
      </Box>

      <Box m='20px' w='290px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Text m='15px' width='210px' fontSize='sm' >
          Откатить все свайпы
        </Text>
        <Button colorScheme='red' mr='10px' mt='10px' mb='10px' size='sm' onClick={clearAllAlert.onOpen}>
          <DeleteIcon />
        </Button>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={clearAllAlertCancelRef}
          onClose={clearAllAlert.onClose}
          isOpen={clearAllAlert.isOpen}
          isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Откатить все свайпы?</AlertDialogHeader>
            <AlertDialogBody>
              Все свайпы будут обнулены. NNDataSet останется.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={clearAllAlertCancelRef} onClick={clearAllAlert.onClose}>
                Отмена
              </Button>
              <Button colorScheme="red" ml={3} onClick={clearAllLikes}>
                Обнулить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>

      <Box m='20px' w='290px' d='flex' position='relative' borderWidth='1px' borderRadius='lg' backgroundColor='white' shadow='0px 20px 50px 0px rgba(0,0,0,0.2)'>
        <Text m='15px' fontSize='sm' >
          Удалить все скачанные фото, базу данных и веса нейронной сети.
        </Text>
        <Button colorScheme='red' mr='10px' mt='10px' mb='10px' size='sm' onClick={deleteAllInfoAlert.onOpen}>
          <DeleteIcon />
        </Button>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={deleteAllInfoAlertCancelRef}
          onClose={deleteAllInfoAlert.onClose}
          isOpen={deleteAllInfoAlert.isOpen}
          closeOnEsc={!isDeleting}
          closeOnOverlayClick={!isDeleting}
          isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>{isDeleting ? "Удаляем..." : "Удалить все?"}</AlertDialogHeader>
            <AlertDialogBody>
              {isDeleting ?
                <Center>
                  <Spinner color="red.500" size="xl" />
                </Center>
                :
                <Box>
                  <Text mb='5%'>Удалятся все скачанные фото, база данных и веса нейронной сети.</Text>
                  <Text>(Откат до состояния: "только что скачанной программы")</Text>
                </Box>
              }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={deleteAllInfoAlertCancelRef} onClick={deleteAllInfoAlert.onClose} isDisabled={isDeleting}>
                Отмена
              </Button>
              <Button colorScheme="red" ml={3} onClick={deleteAllInfo} isDisabled={isDeleting}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
    
    <Text color='red.500' fontSize='large' fontStyle='inherit' fontWeight='bold' fontFamily='inherit'>by @Pashanskiy</Text>
      <Box mt='10px' mb='10px'>
        <Button colorScheme='red' mr='10px' variant='link' size='sm' onClick={infoAlert.onOpen}>
          <Text>Лицензия и используемые фреймворки</Text>
        </Button>

        <AlertDialog
          size='xl'
          motionPreset="slideInBottom"
          leastDestructiveRef={infoAlertCancelRef}
          onClose={infoAlert.onClose}
          isOpen={infoAlert.isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
          isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent >
            {/* <AlertDialogHeader>{"Где взять токен?"}</AlertDialogHeader> */}
            <AlertDialogBody>
              <Text mb='20px' mt='20px' fontWeight='bold'>Лицензия: MIT</Text>
              <Text fontWeight='bold'>Используемые фреймворки:</Text>
              <Text ml='20px' mt='10px' fontWeight='bold'>GoLang:</Text>
              <Box >
                <Box ml='30px' display='grid' >
                  <Link href='https://grpc.io' isExternal>
                    grpc <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/improbable-eng/grpc-web' isExternal>
                    grpc-web <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://developers.google.com/protocol-buffers' isExternal>
                    protobuf <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/jmoiron/sqlx' isExternal>
                    sqlx <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/mattn/go-sqlite3' isExternal>
                    go-sqlite3 <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/pbnjay/pixfont' isExternal>
                    pixfont <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/disintegration/imaging' isExternal>
                    imaging <ExternalLinkIcon mx='2px' />
                  </Link>
                </Box>

                <Text ml='20px' mt='10px' fontWeight='bold'>React, TypeScript:</Text>
                <Box ml='30px' display='grid' >
                  <Link href='https://chakra-ui.com' isExternal>
                    chakra <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/improbable-eng/grpc-web' isExternal>
                    grpc-web <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/protocolbuffers/protobuf' isExternal>
                    google-protobuf <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/webpack/webpack' isExternal>
                    webpack <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/d3/d3-ease' isExternal>
                    d3-ease <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://react-spring.io' isExternal>
                    react-spring <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://use-gesture.netlify.app' isExternal>
                    use-gesture <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu' isExternal>
                    react-horizontal-scrolling-menu <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='http://leandrowd.github.io/react-responsive-carousel' isExternal>
                    react-responsive-carousel <ExternalLinkIcon mx='2px' />
                  </Link>
                </Box>

                <Text ml='20px' mt='10px' fontWeight='bold'>Python:</Text>
                <Box ml='30px' display='grid' >
                  <Link href='https://grpc.io' isExternal>
                    grpc <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://www.tensorflow.org' isExternal>
                    tensorflow <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://github.com/ipazc/mtcnn' isExternal>
                    mtcnn <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://matplotlib.org' isExternal>
                    matplotlib <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://numpy.org' isExternal>
                    numpy <ExternalLinkIcon mx='2px' />
                  </Link>
                  <Link href='https://pillow.readthedocs.io' isExternal>
                    pillow <ExternalLinkIcon mx='2px' />
                  </Link>
                </Box>
              </Box>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" ml={3} onClick={() => infoAlert.onClose()} isDisabled={isDeleting}>
                Ясно, закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Box>
      </Center>

  </div>
}
export default SettingsTab
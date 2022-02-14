import React, { useState, useEffect } from 'react'
import { GrpcServiceClient } from "../grpctransport/grpc_pb_service"
import grpcLibrary from "../grpctransport/grpc_pb"

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  };
}

export function useWindowSize() {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      console.log(window.innerHeight, window.innerWidth)
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }, 500)

    window.addEventListener('resize', debouncedHandleResize)

    return () => {
      window.removeEventListener('resize', debouncedHandleResize)

    }
  }, [])
  return dimensions
}

export interface tokenStruct {
  token: string
  tokenActual: boolean
}

export function getToken(grpcClient: GrpcServiceClient): tokenStruct {
  const tokenInfo: tokenStruct = { token: null, tokenActual: null }
  grpcClient.getToken(new grpcLibrary.EmptyMessage(), null, (err, response) => {
    if (err) {
      console.log(err)
    } else {
      tokenInfo.token = response.getToken()
      tokenInfo.tokenActual = response.getActualtoken()
    }
  })
  return tokenInfo
}

export function colorOfProgress(current: number, max: number) {
  var p = current / max * 100
  if (p < 20) {
    return 'red'
  }
  if (p >= 20 && p < 40) {
    return 'orange'
  }
  if (p >= 40 && p < 60) {
    return 'yellow'
  }
  if (p >= 60 && p < 80) {
    return 'green'
  }
  if (p >= 80) {
    return 'whatsapp'
  }
}

export function getPossibility(grpcClient: GrpcServiceClient, setPossibilityClearLastSwipes: React.Dispatch<React.SetStateAction<boolean>>, usersCount: number) {
  const setLikeToNullLastNUsers = new grpcLibrary.SetLikeToNullLastNUsers()
  setLikeToNullLastNUsers.setCountlastusers(usersCount)
  grpcClient.getPossibilityDeleteLastLikes(setLikeToNullLastNUsers, null, (err, response) => {
    if (err != null) {
      console.log(err)
    } else {
      setPossibilityClearLastSwipes(response.getPossibility())
    }
  })
}

export function clearLastUserSwipe(grpcClient: GrpcServiceClient, setPossibilityClearLastSwipes: React.Dispatch<React.SetStateAction<boolean>>, usersCount: number, reloadPage: boolean) {
  setPossibilityClearLastSwipes(false)
  const SetLikeToNullLastNUsersRequest = new grpcLibrary.SetLikeToNullLastNUsers()
  SetLikeToNullLastNUsersRequest.setCountlastusers(usersCount)
  grpcClient.deleteLastLikes(SetLikeToNullLastNUsersRequest, null, (err, r) => {
    if (err != null) console.log(err)
    if (reloadPage) {
      window.location.reload()
    } else {
      getPossibility(grpcClient, setPossibilityClearLastSwipes, usersCount)
    }
  })
}

export function getWeigthName(grpcClient: GrpcServiceClient, setWeigthName?: React.Dispatch<React.SetStateAction<string>>, weigthIsExistRef?: React.MutableRefObject<boolean>) {
  grpcClient.getWeigthName(new grpcLibrary.EmptyMessage(), null, (err, response) => {
    if (err != null) {
      console.log(err)
    } else {
      if (setWeigthName) {
        setWeigthName(response.getWeigthname())
      }
      if (weigthIsExistRef) {
        console.log("ses", response.getWeigthname(), response.getWeigthname() != "")
        if (response.getWeigthname() != "") {
          weigthIsExistRef.current = true
        } else {
          weigthIsExistRef.current = false
        }
      }
    }
  })
}

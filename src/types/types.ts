import { SetStateAction, Dispatch } from "react"

type Customer = {
  name: string,
  roomNumber?: number,
  extraInformation?: string
}

type Order = {
  id: number,
  name: string
  isChoosen: boolean,
  price: number
}

type TSetStates<T> = Dispatch<SetStateAction<T>>


export type {
  Customer,
  Order,
  TSetStates
}
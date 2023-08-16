import {File} from "buffer";
import {Dayjs} from "dayjs";

type Database = {
  users?: {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
    img: File
    adminPrivileges: boolean
    dateOfBirth: typeof Dayjs

  }[]
}


export const activeDataBase: Database = {}
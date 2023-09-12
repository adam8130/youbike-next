import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'


class Store {
  constructor() {
    makeAutoObservable(this)
  }

  displayData = []
  rawData = []
  filteredData = []
  availableAreaArr = []
  currentCity = '台北市'

  setDisplayData = (act) => this.displayData = act
  setRawData = (act) => this.rawData = act
  setFilteredData = (act) => this.filteredData = act
  setAvailableAreaArr = (act) => this.availableAreaArr = act
  setCurrentCity = (act) => this.currentCity = act

  availableCities = [
    {
      city: '台北市',
      url: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
    },
    {
      city: '新北市',
      url: 'https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=5000'
    }
  ]

}

const store = new Store()
const context = createContext(store)
export const useStore = () => useContext(context)
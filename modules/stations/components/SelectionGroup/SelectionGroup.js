import React, { useRef, useState } from 'react'
import { FormControlLabel, Checkbox, Stack, FormGroup, Box, useMediaQuery } from '@mui/material';
import { ArrowDropDown, Close, Search } from '@mui/icons-material';
import { Root, SelectRoot, InputRoot } from './SelectionGroup.element';
import { useStore } from '@/store/index';
import { observer } from 'mobx-react-lite';
import { throttle } from '@/utils/throttle';
import Image from 'next/image';

function SelectionGroup() {

  const isMobile = useMediaQuery('(max-width:768px)');

  const { currentCity, availableCities, displayData, rawData, availableAreaArr, filteredData } = useStore()
  const { setDisplayData, setCurrentCity, setFilteredData, setAvailableAreaArr } = useStore()

  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setFilteredData([]);
      setDisplayData(rawData);
      ref.current.value = ""
    }
    else {
      setFilteredData([...filteredData, ...displayData])
      setDisplayData([])
    }
    setAvailableAreaArr(
      availableAreaArr.map(item => ({
        sarea: item.sarea,
        checked: e.target.checked
      }))
    )
  };
  const handleCheckboxChange = (e, item) => {
    if (e.target.checked) {
      let arr = filteredData.filter(displayData => displayData.sarea === item.sarea)
      setFilteredData(filteredData.filter(displayData => displayData.sarea !== item.sarea))
      setDisplayData([...displayData, ...arr])
    }
    else {
      let arr = displayData.filter(displayData => displayData.sarea === item.sarea)
      setFilteredData([...filteredData, ...arr])
      setDisplayData(displayData.filter(displayData => displayData.sarea !== item.sarea))
    }
    setAvailableAreaArr(
      availableAreaArr.map(arrItem =>
        arrItem.sarea === item.sarea ? { ...arrItem, checked: !item.checked } : arrItem
      )
    )
  }
  const throttledInputChange = throttle(() => {
    let newDisplayData = rawData.filter(item => item.sna.includes(ref.current.value))

    let arr = []
    newDisplayData.forEach(item => !arr.includes(item.sarea) && arr.push(item.sarea))

    setAvailableAreaArr(
      availableAreaArr.map(arrItem =>
        !arr.includes(arrItem.sarea) ? { ...arrItem, checked: false } : { ...arrItem, checked: true }
      )
    )
    setDisplayData(newDisplayData)
  }, 600)

  return (
    <Root $isMobile={isMobile}>
      <Box>
        <Stack 
          direction={isMobile ? 'column-reverse' : 'row'} 
          sx={{ gap: '16px'}}
        >
          <SelectRoot $isMobile={isMobile}>
            <div onClick={() => setSelectMenuOpen((prev) => !prev)}>
              <span>{currentCity}</span>
              <ArrowDropDown />
            </div>
            {selectMenuOpen && (
              <div className='dropdown-select'>
                {availableCities.map((item, idx) => (
                  <span
                    key={idx}
                    style={item.city === currentCity ? { fontWeight: 500 } : {}}
                    onClick={() => {
                      setCurrentCity(item.city)
                      setSelectMenuOpen(false)
                    }}
                  >
                    {item.city}
                  </span>
                ))}
              </div>
            )}
          </SelectRoot>
          <InputRoot $isMobile={isMobile}>
            <input
              ref={ref}
              placeholder='搜尋站點'
              onChange={() => {
                throttledInputChange()
              }}
            />
            {
              ref.current?.value ? (
                <Close 
                  onClick={() => {
                    ref.current.value = ''
                    throttledInputChange()
                  }}
                />
              ) : (
                <Search />
              )
            }
          </InputRoot>
        </Stack>
        <FormControlLabel
          sx={{ mt: '24px' }}
          control={
            <Checkbox
              defaultChecked
              onChange={handleSelectAll}
            />
          }
          label="全部勾選"
        />
        <FormGroup>
          {availableAreaArr.map((item, idx) =>
            <FormControlLabel
              key={idx}
              control={
                <Checkbox
                  checked={availableAreaArr[idx].checked}
                  onChange={(e) => {
                    handleCheckboxChange(e, item)
                    ref.current.value = ""
                  }}
                />
              }
              label={item.sarea}
            />
          )}
        </FormGroup>
      </Box>
      {!isMobile && (
        <Box>
          <Image
            src={'/static/frame.png'}
            width={502}
            height={172}
            priority
            alt=""
          />
        </Box>
      )}
    </Root>
  )
}
export default observer(SelectionGroup);
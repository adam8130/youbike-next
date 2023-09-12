import React, { useRef, useState } from 'react'
import { styled, FormControlLabel, Checkbox, Stack, FormGroup, Box, useMediaQuery } from '@mui/material';
import { ArrowDropDown, Search } from '@mui/icons-material';
import { useStore } from '@/store/index';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';

const Root = styled('div')(
  ({ $isMobile }) => `
    margin-top: 32px;
    margin-bottom: 40px;
    display: flex;
    gap: 5%;
    ${$isMobile && (`
      margin-top: 32px;
      margin-bottom: 24px;
    `)};
    .MuiBox-root:nth-of-type(1) {
      width: ${$isMobile ? '100%' : '45%'};
      display: flex;
      flex-direction: column;
      .MuiFormGroup-root {
        display: flex;
        flex-direction: row;
        ${$isMobile && 'justify-content: space-between'};
      }
      .Mui-checked {
        color: #B5CC22;
      }
    }
    .MuiBox-root:nth-of-type(2) {
      width: 50%;
      display: flex;
      align-items: flex-end;
      img {
        flex-shrink: 0;
      }
    }
  `
);
const SelectRoot = styled('div')(
  ({ $isMobile }) => `
    position: relative;
    div:nth-of-type(1) {
      width: ${$isMobile ? '100%' : '175px'};
      height: 40px;
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 8px;
      background: #F6F6F6;
      cursor: pointer;
    }
    .dropdown-select {
      width: ${$isMobile ? '100%' : '175px'};
      padding: 16px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background: #F6F6F6;
      position: absolute;
      top: 52px;
      z-index: 10;
      span {
        color: #323232;
        cursor: pointer;
      }
    }  
  `
);
const InputRoot = styled('div')(
  ({ $isMobile }) => `
    width: ${$isMobile ? '100%' : '277px'};
    height: 40px;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    background: #F6F6F6;
    input {
      width: 100%;
      background: #F6F6F6;
      border: none;
    }
    input:focus{
      outline: none;
    }
  `
);

function SelectionGroup() {

  const isMobile = useMediaQuery('(max-width:768px)');

  const { currentCity, availableCities, displayData, rawData, availableAreaArr, filteredData } = useStore()
  const { setDisplayData, setCurrentCity, setFilteredData, setAvailableAreaArr } = useStore()

  const [selectMenuOpen, setSelectMenuOpen] = useState(false);
  const ref = useRef(null);

  const selectAllChange = (e) => {
    setAvailableAreaArr(availableAreaArr.map(item => ({
      sarea: item.sarea,
      checked: e.target.checked
    })))
    if (e.target.checked) {
      setFilteredData([]);
      setDisplayData(rawData);
      ref.current.value = ""
    }
    else {
      setFilteredData([...filteredData, ...displayData])
      setDisplayData([])
    }
  }

  const checkboxChange = (e, item) => {
    setAvailableAreaArr(availableAreaArr.map(arrItem =>
      arrItem.sarea === item.sarea ? { ...arrItem, checked: !item.checked } : arrItem
    ))
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
  }

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
                    onClick={() => {
                      setCurrentCity(item.city)
                      setSelectMenuOpen(false)
                    }}
                    style={item.city === currentCity ? { fontWeight: 500 } : {}}
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
              type="search"
              placeholder='搜尋站點'
              onChange={(e) => {
                let arr = []
                let newData = rawData.filter(item => item.sna.includes(e.target.value))
                newData.forEach(item => !arr.includes(item.sarea) && arr.push(item.sarea))
                console.log(arr)
                setAvailableAreaArr(availableAreaArr.map(arrItem =>
                  !arr.includes(arrItem.sarea) ? { ...arrItem, checked: false } : { ...arrItem, checked: true }
                ))
                setDisplayData(newData)
              }}
            />
            <Search />
          </InputRoot>
        </Stack>
        <FormControlLabel
          sx={{ mt: '24px' }}
          control={
            <Checkbox
              defaultChecked
              onChange={selectAllChange}
            />
          }
          label="全部勾選"
        />
        <FormGroup>
          {availableAreaArr.map((item, i) =>
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={availableAreaArr[i].checked}
                  onChange={(e) => checkboxChange(e, item)}
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
            src={require('../../../public/static/frame.png')}
            width={502}
            height={172}
            alt=""
          />
        </Box>
      )}
    </Root>
  )
}
export default observer(SelectionGroup);
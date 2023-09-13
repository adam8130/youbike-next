import { styled } from '@mui/material'

export const Root = styled('div')(
  ({ $isMobile }) => `
    margin-top: 32px;
    margin-bottom: ${$isMobile ? '24px' : '40px'};
    display: flex;
    gap: 5%;
    .MuiBox-root:nth-of-type(1) {
      width: ${$isMobile ? '100%' : '45%'};
      display: flex;
      flex-direction: column;
      .MuiFormGroup-root {
        display: flex;
        flex-direction: row;
        justify-content: ${$isMobile && 'space-between'};
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
export const SelectRoot = styled('div')(
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
      left: 0;
      z-index: 10;
      span {
        color: #323232;
        cursor: pointer;
      }
    }  
  `
);
export const InputRoot = styled('div')(
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
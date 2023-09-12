import React, { useEffect } from 'react';
import { styled, useMediaQuery } from '@mui/material';
import SelectionGroup from './components/SelectionGroup';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/store/index';

const Root = styled('div')(
  ({ $isMobile }) => `
    padding: 32px 124px 44px 124px;
    ${$isMobile && 'padding: 24px 32px 34px 32px'};
    h1 {
      color: #B5CC22;
      font-family: Noto Sans CJK TC;
      font-size: ${$isMobile ? '18px' : '24px'};
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 4.32px;
    }
    table {
      border-collapse: separate;
      border: 0.5px solid #AEAEAE;
      border-radius: ${$isMobile ? '8px' : '28px'};
      border-spacing: 0;
      thead {
        display: table;
        border-radius: 28px 28px 0px 0px;
        ${$isMobile && 'border-radius: 8px 8px 0 0'};
        table-layout: fixed;
        width: 100%;
        background: #B5CC22;
        th {
          color: white;
          padding: ${$isMobile ? '20px 10px' : '20px'};
          font-size: ${$isMobile ? '16px' : '18px'};
        }
      }
      tbody {
        border-radius: 0 0 28px 28px;
        ${$isMobile && 'border-radius: 0 0 8px 8px'};
        display: block;
        overflow-y: scroll; 
        height: 320px;
        tr {
          display: table;
          table-layout: fixed;
          width: 100%;
          text-align: center;
          td {
            font-size: ${$isMobile ? '14px' : '16px'};
            padding: 20px 14px;
          }
        }
        tr:nth-of-type(even) {
          background-color: #f1f1f1;
        }
      }
    }
  `
);

function StationHome() {
  const isMobile = useMediaQuery('(max-width:768px)');

  const { currentCity, availableCities, displayData } = useStore();
  const { setAvailableAreaArr, setDisplayData, setRawData } = useStore();

  useEffect(() => {
    const url = availableCities.find((item) => item.city === currentCity).url

    fetch(url)
      .then(res => res.json())
      .then(res => {
        let arr = []
        res.forEach((item) => !arr.some(arrItem => arrItem.sarea === item.sarea) && arr.push({
          sarea: item.sarea,
          checked: true
        }))
        setAvailableAreaArr(arr)
        setDisplayData(res)
        setRawData(res)
      })
  }, [currentCity, availableCities, setAvailableAreaArr, setDisplayData, setRawData])

  return (
    <Root $isMobile={isMobile}>
      <h1>站點資訊</h1>
      <SelectionGroup />
      <table>
        <thead>
          <tr>
            <th style={{ width: isMobile ? '25%' : '15%' }} align="center">縣市</th>
            <th style={{ width: isMobile ? '25%' : '15%' }} align="center">區域</th>
            <th style={{ width: isMobile ? '60%' : '40%' }} align="center">站點名稱</th>
            {!isMobile && (
              <>
                <th style={{ width: "15%" }} align="center">可借車輛</th>
                <th style={{ width: "15%" }} align="center">可還空位</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {displayData?.map((item) => (
            <tr key={item.sno}>
              <td style={{ width: isMobile ? '25%' : '15%' }} align="center">{currentCity}</td>
              <td style={{ width: isMobile ? '25%' : '15%' }} align="center">{item.sarea}</td>
              <td style={{ width: isMobile ? '60%' : '40%' }} align="center">{item.sna}</td>
              {!isMobile && (
                <>
                  <td style={{ width: "15%" }} align="center">{item.sbi}</td>
                  <td style={{ width: "15%" }} align="center">{item.bemp}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Root>
  );
}

export default observer(StationHome);

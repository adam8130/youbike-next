import React, { useState } from 'react';
import { styled, useMediaQuery, IconButton } from '@mui/material';
import { Close, Menu } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

const Root = styled('div')(
  ({ $isMobile, $isMobileMenuOpen }) => `
    width: 100%;
    padding: 6px 124px 3px 124px;
    ${$isMobile && 'padding: 6px 32px 3px 32px'};
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EBEBEB;
    ul {
      width: 100%;
      display: inline-flex;
      align-items: center;
      gap: 40px;
      ${!$isMobile && 'margin-left: 60px'};
      ${$isMobile && !$isMobileMenuOpen && 'display: none'};
      ${$isMobile && (`
        width: 100%;
        height: calc(100vh - 104px);
        padding: 32px;
        padding-bottom: 108px;
        gap: 32px;
        flex-direction: column;
        align-items: flex-start;
        position: fixed;
        top: 104px;
        left: 0;
        background: #B5CC22;
        z-index: 99;
      `)};
      a {
        color: ${$isMobile ? '#FFF' : '#677510'};
        font-family: Noto Sans CJK TC;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 133.333% */
        ${$isMobileMenuOpen && 'letter-spacing: 3.24px'};
      }
      button {
        margin-left: auto;
        padding: 10px 24px;
        background: #B5CC22;
        color: #FFF;
        text-align: center;
        font-family: Noto Sans CJK TC;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px; /* 111.111% */
        letter-spacing: 0.1px;
        border-radius: 100px;
        ${$isMobileMenuOpen && (`
          margin: auto 0 0 0;
          background: #FFF;
          color: #B5CC22;
        `)}
      }
    }
    .MuiIconButton-root {
      margin-left: auto;
      svg {
        color: #B5CC22;
      }
    }
  `
)

export function Header() {

  const isMobile = useMediaQuery('(max-width:768px)');
  const router = useRouter();

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentRoute = router.pathname.split('/')[1];
  const menuItems = [
    {label: '使用說明', url: 'introduction'},
    {label: '收費方式', url: 'pricing'},
    {label: '站點資訊', url: 'stations'},
    {label: '最新消息', url: 'news'},
    {label: '活動專區', url: 'activity'},
  ];

  return (
    <Root $isMobile={isMobile} $isMobileMenuOpen={isMobileMenuOpen}>
      <Image 
        src={'/static/logo.png'}
        width={95}
        height={95}
        alt="logo"
        priority
      />
      <ul>
        {menuItems.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.url}
            style={
              item.url === currentRoute
                ? isMobileMenuOpen 
                ? { color: '#677510' }
                : { color: '#B5CC22' }
                : {}
            }
          >
            {item.label}
          </Link>
        ))}
        <button>登入</button>
      </ul>
      {isMobile && (
        <IconButton onClick={() => setMobileMenuOpen((prev) => !prev)}>
          {isMobileMenuOpen ? <Close /> : <Menu /> }
        </IconButton>
      )}
    </Root>
  )
}
/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.NADZORNA.PLOCA'})}
        fontIcon='bi-app-indicator'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Administracija</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Postavke sustava'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/files/fil003.svg'
      >
        <AsideMenuItem to='/apps/work-record/work-items' title='Korisnici' hasBullet={true} />
      </AsideMenuItemWithSub> 
    </>
  )
}

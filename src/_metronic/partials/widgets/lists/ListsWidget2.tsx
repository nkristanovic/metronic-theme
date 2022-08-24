/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../helpers'
import {Dropdown1} from '../../content/dropdown/Dropdown1'

type Props = {
  className: string
}

const ListsWidget2: React.FC<Props> = ({className}) => {
  const [user, setUser] = useState<any[]>([])
  const authors = async () => {
    const res = await fetch('https://reqres.in/api/users/')
    const json = await res.json()
    setUser(json.data)
  }
  useEffect(() => {
    authors()
  }, [])

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0'>
        <h3 className='card-title fw-bold text-dark'>Authors</h3>
        <div className='card-toolbar'>
          {/* begin::Menu */}
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
          </button>
          <Dropdown1 />
        </div>
      </div>
      {user.map((us) => {
        return (
          <div className='card-body pt-2' key={us.id}>
            {/* begin::Item */}
            <div className='d-flex align-items-center mb-7'>
              <div className='symbol symbol-50px me-5'>
                <img src={us.avatar} className='' alt={us.avatar} />
              </div>

              <div className='flex-grow-1'>
                <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                  {us.first_name} {}
                  {us.last_name}
                </a>
                <span className='text-muted d-block fw-semibold'>{us.email}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export {ListsWidget2}

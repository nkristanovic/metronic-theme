import React from 'react'
import {useFormik, yupToFormErrors} from 'formik'
import {SetStateAction, useEffect, useState} from 'react'
import * as Yup from 'yup'
import classes from '../../../../../_metronic/assets/sass/errors.module.scss'
import style from '../../../../../_metronic/assets/sass/icons.module.scss'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import swal from 'sweetalert'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import clsx from 'clsx'

type Props = {
  className: string
}

const WorkItems: React.FC<Props> = ({className}) => {
  const [users, setUsers] = useState<any[]>([])
  const [value, setValue] = useState('')
  const [isVisible, setVisible] = useState(false)
  const [isVisiblePassword, setVisiblePassword] = useState(false)
  const [startDate, setStartDate] = React.useState(new Date('2014-08-18T21:11:54'))

  const handleChange = (newValue: any) => {
    setStartDate(newValue)
  }

  // function isEven(this: any, message: any) {
  //   return this.test('isEven', message, (value: number) => {
  //     if (value) {
  //       return value % 2 == 0
  //     }
  //   })
  // }

  // Yup.addMethod(Yup.number, 'isEven', isEven)

  const formik = useFormik({
    initialValues: {
      id: 1,
      username: '',
      password: '',
      passwordConfirmation: '',
      email: '',
      userType: '',
      userStatus: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      country: '',
      telephone: '',
      mobile: '',
      dateOfBirth: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Korisničko ime je obavezno polje')
        .min(4, 'Minimalno 4 simbola')
        .max(20, 'Maximalno 20 simbola'),
      password: Yup.string()
        .required('Lozinka je obavezno polje')
        .lowercase('Minimalno 1 malo slovo')
        .uppercase('Minimalno 1 veliko slovo')
        .min(6, 'Minimalno 6 simbola')
        .max(20, 'Maximalno 20 simbola'),
      passwordConfirmation: Yup.string()
        .test('password-match', 'Lozinka mora odgovarati', function (value) {
          return this.parent.password === value
        })
        .required('Ponovljena lozinka je obavezno polje'),
      email: Yup.string().email('Pogrešna email adresa').required('Email je obavezno polje'),
      userType: Yup.string().required('Tip korisnika je obavezno polje'),
      userStatus: Yup.string().required('Status korisnika je obavezno polje'),
      firstName: Yup.string().required('Ime je obavezno polje'),
      lastName: Yup.string().required('Prezime je obavezno polje'),
      city: Yup.string(),
      address: Yup.string(),
      country: Yup.string(),
      telephone: Yup.string(),
      mobile: Yup.string(),
      dateOfBirth: Yup.date(),
    }),
    onSubmit: (values, {resetForm}) => {
      setUsers([...users, values])
      resetForm()
    },
  })

  // useEffect(() => {
  //   localStorage.setItem('users', JSON.stringify(users))
  // }, [users])

  const deleteRow = (index: number) => {
    swal({
      title: 'Jeste li sigurni da želite izbrisati radnu stavku?',
      text: 'Ovu radnju nije moguće poništiti!',
      icon: 'warning',
      buttons: ['cancel', true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Vaša radna stavka je uspješno izbrisana!', {
          icon: 'success',
        })
        const NewUsers = [...users]
        NewUsers.splice(index, 1)
        setUsers(NewUsers)
      } else {
      }
    })
  }

  const handleSearch = (e: {target: {value: SetStateAction<string>}}) => {
    setValue(e.target.value)
  }

  const filteredUsers = users.filter((events) => {
    return (
      events.userType.toLowerCase().includes(value.toLowerCase()) ||
      events.userStatus.toLowerCase().includes(value.toLowerCase()) ||
      events.username.toLowerCase().includes(value.toLowerCase()) ||
      events.email.toLowerCase().includes(value.toLowerCase())
    )
  })
  const handlePassword = () => {
    setVisible(!isVisible)
  }

  const handlePasswordConfirmation = () => {
    setVisiblePassword(!isVisiblePassword)
  }
  return (
    <>
      <form onSubmit={formik.handleSubmit} className='form w-100'>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='username'>
            Korisničko ime
          </label>
          <input
            type='text'
            {...formik.getFieldProps('username')}
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.username && formik.errors.username},
              {
                'is-valid': formik.touched.username && !formik.errors.username,
              }
            )}
          />
          {formik.touched.username && formik.errors.username && (
            <div className={classes.error}>{formik.errors.username}</div>
          )}
        </div>

        <div className='mb-10'>
          <label className='form-label required' htmlFor='password'>
            Lozinka
          </label>
          <div className={style.input}>
            <input
              type={!isVisible ? 'password' : 'text'}
              className={clsx(
                'form-control',
                {'is-invalid': formik.touched.password && formik.errors.password},
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
              {...formik.getFieldProps('password')}
            />
            <span className={style.icons} onClick={handlePassword}>
              {isVisible ? <AiOutlineEye size='30px' /> : <AiOutlineEyeInvisible size='30px' />}
            </span>

            {formik.touched.password && formik.errors.password ? (
              <div className={classes.error}>{formik.errors.password}</div>
            ) : null}
          </div>
        </div>

        <div className='mb-10'>
          <label className='form-label required' htmlFor='passwordConfirmation'>
            Ponovljena lozinka
          </label>
          <div className={style.input}>
            <input
              type={!isVisiblePassword ? 'password' : 'text'}
              className={clsx(
                'form-control',
                {
                  'is-invalid':
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation,
                },
                {
                  'is-valid':
                    formik.touched.passwordConfirmation && !formik.errors.passwordConfirmation,
                }
              )}
              {...formik.getFieldProps('passwordConfirmation')}
            />
            <span className={style.icons} onClick={handlePasswordConfirmation}>
              {isVisiblePassword ? (
                <AiOutlineEye size='30px' />
              ) : (
                <AiOutlineEyeInvisible size='30px' />
              )}
            </span>
          </div>
          {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
            <div className={classes.error}>{formik.errors.passwordConfirmation}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='email'>
            E-mail
          </label>
          <input
            type='email'
            className={clsx(
              'form-control ',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={classes.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='userType'>
            Tip korisnika
          </label>
          <select
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.userType && formik.errors.userType},
              {
                'is-valid': formik.touched.userType && !formik.errors.userType,
              }
            )}
            aria-label='Select example'
            {...formik.getFieldProps('userType')}
            placeholder='Odaberite vrijednost iz liste'
          >
            <option value=''>Odaberite vrijednost iz liste...</option>
            <option value='Administrator'>Administrator</option>
            <option value='Korisnik'>Korisnik</option>
          </select>
          {formik.touched.userType && formik.errors.userType ? (
            <div className={classes.error}>{formik.errors.userType}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='userStatus'>
            Status korisnika
          </label>
          <select
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.userStatus && formik.errors.userStatus},
              {
                'is-valid': formik.touched.userStatus && !formik.errors.userStatus,
              }
            )}
            aria-label='Select example'
            {...formik.getFieldProps('userStatus')}
            placeholder='Odaberite vrijednost iz liste'
          >
            <option value=''>Odaberite vrijednost iz liste...</option>
            <option value='Aktivan'>Aktivan</option>
            <option value='Neaktivan'>Neaktivan</option>
            <option value='Suspendiran'>Suspendiran</option>
          </select>
          {formik.touched.userStatus && formik.errors.userStatus ? (
            <div className={classes.error}>{formik.errors.userStatus}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='firstName'>
            Ime
          </label>
          <input
            type='text'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.firstName && formik.errors.firstName},
              {
                'is-valid': formik.touched.firstName && !formik.errors.firstName,
              }
            )}
            {...formik.getFieldProps('firstName')}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className={classes.error}>{formik.errors.firstName}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label required' htmlFor='lastName'>
            Prezime
          </label>
          <input
            type='text'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.lastName && formik.errors.lastName},
              {
                'is-valid': formik.touched.lastName && !formik.errors.lastName,
              }
            )}
            {...formik.getFieldProps('lastName')}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className={classes.error}>{formik.errors.lastName}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='address'>
            Adresa
          </label>
          <input
            type='text'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.address && formik.errors.address},
              {
                'is-valid': formik.touched.address && !formik.errors.address,
              }
            )}
            {...formik.getFieldProps('address')}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className={classes.error}>{formik.errors.address}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='city'>
            Grad
          </label>
          <input
            type='text'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.city && formik.errors.city},
              {
                'is-valid': formik.touched.city && !formik.errors.city,
              }
            )}
            {...formik.getFieldProps('city')}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className={classes.error}>{formik.errors.city}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='country'>
            Država
          </label>
          <input
            type='text'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.country && formik.errors.country},
              {
                'is-valid': formik.touched.country && !formik.errors.country,
              }
            )}
            {...formik.getFieldProps('country')}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className={classes.error}>{formik.errors.country}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='telephone'>
            Telefon
          </label>
          <input
            type='tel'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.telephone && formik.errors.telephone},
              {
                'is-valid': formik.touched.telephone && !formik.errors.telephone,
              }
            )}
            {...formik.getFieldProps('telephone')}
          />
          {formik.touched.telephone && formik.errors.telephone ? (
            <div className={classes.error}>{formik.errors.telephone}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='mobile'>
            Mobitel
          </label>
          <input
            type='tel'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.mobile && formik.errors.mobile},
              {
                'is-valid': formik.touched.mobile && !formik.errors.mobile,
              }
            )}
            {...formik.getFieldProps('mobile')}
          />
          {formik.touched.mobile && formik.errors.mobile ? (
            <div className={classes.error}>{formik.errors.mobile}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='dateOfBirth'>
            Datum rođenja
          </label>
          <input
            type='date'
            className={clsx(
              'form-control',
              {'is-invalid': formik.touched.dateOfBirth && formik.errors.dateOfBirth},
              {
                'is-valid': formik.touched.dateOfBirth && !formik.errors.dateOfBirth,
              }
            )}
            {...formik.getFieldProps('dateOfBirth')}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className={classes.error}>{formik.errors.dateOfBirth}</div>
          ) : null}
        </div>

        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
      {users.length > 0 ? (
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Popis korisnika</span>
            </h3>
            <div
              className='card-toolbar'
              data-bs-toggle='tooltip'
              data-bs-placement='top'
              data-bs-trigger='hover'
              title='Click to add a user'
            ></div>
            <div className='search-form'>
              <label className='form-label search-label'>Pretraži:</label>
              <input type='text' className='form-control' onChange={handleSearch} value={value} />
            </div>
          </div>

          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <thead>
                  <tr className='fw-bold text-muted'>
                    <th className='min-w-20px'>ID</th>
                    <th className='min-w-90px'>Tip korisnika</th>
                    <th className='min-w-90px'>Status korisnika</th>
                    <th className='min-w-90px'>Korisničko ime</th>
                    <th className='min-w-90px'>E-mail</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                              {index + 1}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='d-flex justify-content-start flex-column'>
                            <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                              {user.userType}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {user.userStatus}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {user.username}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {user.email}
                        </a>
                      </td>
                      <td>
                        <div className='d-flex justify-content-end flex-shrink-0'>
                          <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                          >
                            <KTSVG
                              path='/media/icons/duotune/art/art005.svg'
                              className='svg-icon-3'
                            />
                          </a>
                          <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                            onClick={() => deleteRow(index)}
                          >
                            <KTSVG
                              path='/media/icons/duotune/general/gen027.svg'
                              className='svg-icon-3'
                            />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className={`card ${className}`}>
          <div className='card-header margin border-0 pt-1'>
            <h3 className='card-title  flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Nema korisnika u sustavu!</span>
            </h3>
          </div>
        </div>
      )}
    </>
  )
}

export default WorkItems
function id(id: any) {
  throw new Error('Function not implemented.')
}

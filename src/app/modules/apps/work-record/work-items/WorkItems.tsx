import {useFormik, yupToFormErrors} from 'formik'
import {SetStateAction, useEffect, useState} from 'react'
import * as Yup from 'yup'
import classes from '../../../../../_metronic/assets/sass/errors.module.scss'
import {KTSVG, toAbsoluteUrl} from '../../../../../_metronic/helpers'
import swal from 'sweetalert'

type Props = {
  className: string
}

const WorkItems: React.FC<Props> = ({className}) => {
  const [items, setItems] = useState<any[]>([])
  const [value, setValue] = useState('')

  function isEven(this: any, message: any) {
    return this.test('isEven', message, (value: number) => {
      if (value) {
        return value % 2 == 0
      }
    })
  }

  Yup.addMethod(Yup.number, 'isEven', isEven)

  const formik = useFormik({
    initialValues: {
      id: 1,
      client: '',
      oib: '',
      project: '',
      numberOfHours: '',
      date: '',
      notice: '',
    },
    validationSchema: Yup.object().shape({
      client: Yup.string().min(3, 'Minimum 3 symbols'),
      oib: (Yup as any).number().isEven('Must be an evan number'),
      project: Yup.string(),
      numberOfHours: Yup.string(),
      date: Yup.string(),
      notice: Yup.string(),
    }),
    onSubmit: (values, {resetForm}) => {
      setItems([...items, values])
      resetForm()
    },
  })

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const deleteRow = (index: number) => {
    swal({
      title: 'Jeste li sigurni da želite izbrisati radnu stavku?',
      text: 'Ovu radnju nije moguće poništiti!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Vaša radna stavka je uspješno izbrisana!', {
          icon: 'success',
        })
        const NewItems = [...items]
        NewItems.splice(index, 1)
        setItems(NewItems)
      } else {
      }
    })
  }

  const handleSearch = (e: {target: {value: SetStateAction<string>}}) => {
    setValue(e.target.value)
  }

  const filteredItems = items.filter((events) => {
    return events.client.toLowerCase().includes(value.toLowerCase()) || events.project.toLowerCase().includes(value.toLowerCase()) || events.date.toLowerCase().includes(value.toLowerCase())
    || events.numberOfHours.toLowerCase().includes(value.toLowerCase()) || events.notice.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='form w-100'>
        <div className='mb-10'>
          <label className='form-label' htmlFor='client'>
            Client
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Client'
            {...formik.getFieldProps('client')}
          />
          {formik.touched.client && formik.errors.client ? (
            <div className={classes.error}>{formik.errors.client}</div>
          ) : null}
        </div>

        <div className='mb-10'>
          <label className='form-label' htmlFor='oib'>
            Oib
          </label>
          <input
            type='number'
            className='form-control'
            placeholder='Oib'
            {...formik.getFieldProps('oib')}
          />
          {formik.touched.oib && formik.errors.oib ? (
            <div className={classes.error}>{formik.errors.oib}</div>
          ) : null}
        </div>

        <div className='mb-10'>
          <label className='form-label' htmlFor='project'>
            Project
          </label>
          <input
            type='text'
            className='form-control'
            placeholder='Project'
            {...formik.getFieldProps('project')}
          />
          {formik.touched.project && formik.errors.project ? (
            <div className={classes.error}>{formik.errors.project}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='numberOfHours'>
            Number of hours
          </label>
          <input type='time' className='form-control' {...formik.getFieldProps('numberOfHours')} />
          {formik.touched.numberOfHours && formik.errors.numberOfHours ? (
            <div className={classes.error}>{formik.errors.numberOfHours}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='date'>
            Date
          </label>
          <input type='date' className='form-control' {...formik.getFieldProps('date')} />
          {formik.touched.date && formik.errors.date ? (
            <div className={classes.error}>{formik.errors.date}</div>
          ) : null}
        </div>
        <div className='mb-10'>
          <label className='form-label' htmlFor='notice'>
            Notice
          </label>
          <input
            type='text'
            className='form-control'
            placeholder=''
            {...formik.getFieldProps('notice')}
          />
          {formik.touched.notice && formik.errors.notice ? (
            <div className={classes.error}>{formik.errors.notice}</div>
          ) : null}
        </div>
        <button type='submit' className='btn btn-primary'>
          Save
        </button>
      </form>
      {items.length > 0 ? (
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Work items list</span>
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
                    <th className='min-w-90px'>Client</th>
                    <th className='min-w-90px'>Project</th>
                    <th className='min-w-90px'>Date</th>
                    <th className='min-w-90px'>Number of hours</th>
                    <th className='min-w-200px'>Notice</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item, index) => (
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
                              {item.client}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.project}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.numberOfHours}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.date}
                        </a>
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {item.notice}
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
              <span className='card-label fw-bold fs-3 mb-1'>There are no work items yet!</span>
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

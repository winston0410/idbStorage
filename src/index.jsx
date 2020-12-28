import React, { useContext, useEffect, useRef } from 'react'
import { useFormikContext } from 'formik'
import {
  useIDB
} from '@blackblock/use-idb'
import {
  isNil
} from 'ramda'

function IDBStorage ({ database, objectStore, dataKey, children }) {
  const { setValues, isValid, values } = useFormikContext()
  const [formData, setFormData] = useIDB({
    database: database,
    objectStore: objectStore,
    key: dataKey
  })

  const beforeReadingFromIDB = useRef(true)

  // Set value with idb value from IDB
  useEffect(() => {
    if (beforeReadingFromIDB.current) {
      if (!isNil(formData)) {
        setValues(formData)
        beforeReadingFromIDB.current = false
      }
    }
  }, [formData, setValues])

  useEffect(() => {
    if (!beforeReadingFromIDB.current) {
      setFormData(values)
    }
  }, [values, setFormData])

  return null
}

export default IDBStorage

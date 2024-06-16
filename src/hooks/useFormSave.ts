import { message } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-components'

interface Options<Fields> {
  apiMethod: (fields: Fields, ...args: any[]) => Promise<Api.ResponseData<Fields>>
  formInstance?: ProFormInstance
  formRef?: React.MutableRefObject<ProFormInstance>
  onSuccess?: (response: Api.ResponseData<any>) => void
  onFail?: (error: any) => void
  loadingMessage?: string
  successMessage?: string
  errorMessage?: string
}

export function useFormSave<Fields extends Record<string, any>>(options: Options<Fields>) {
  const {
    apiMethod,
    onSuccess,
    onFail,
    formRef,
    formInstance,
    loadingMessage = '正在保存改动...',
    successMessage = '保存成功',
  } = options
  const hide = useRef<() => void>()

  const handleSave = useCallback(async (fields: Fields, ...args: any[]) => {
    hide.current = message.loading(loadingMessage)

    try {
      const response = await apiMethod(fields, ...args)

      message.success(successMessage)
      onSuccess && onSuccess(response)
    }
    catch (error) {
      const formErrors = Object.entries(error as Api.ValidationError<Fields>).map(([name, errors]) => ({ name, errors }))
      if (formRef)
        formRef.current?.setFields(formErrors)
      else if (formInstance)
        formInstance.setFields(formErrors)
      onFail && onFail(error)
    }
    finally {
      hide.current && hide.current()
    }
  }, [apiMethod, onSuccess, onFail, formInstance, formRef, loadingMessage, successMessage])

  return { handleSave }
}

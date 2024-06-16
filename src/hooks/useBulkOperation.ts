export function useBulkOperation() {
  const [spinning, setSpinning] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isSelectAll, setIsSelectAll] = useState(false)
  const [searchParams, setSearchParams] = useState({})

  async function handleBulkOperation(
    apiMethod: (parmas: Record<string, any>) => Promise<any>,
  ) {
    setSpinning(true)

    try {
      await apiMethod(isSelectAll ? searchParams : { id: selectedRowKeys })
    }
    catch (error) {
      return Promise.reject(error)
    }
    finally {
      setSpinning(false)
    }
  }

  /** 点击勾选时的回调 */
  function handleSelectChange(newSelectedRowKeys: React.Key[]) {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  /** 点击搜索时的回调 */
  function handleSearch(params: Record<string, any>) {
    setSearchParams(params)
    setSelectedRowKeys([])
    setIsSelectAll(false)
  }

  /** 点击重置时的回调 */
  function handleReset() {
    setSearchParams({})
    setSelectedRowKeys([])
    setIsSelectAll(false)
  }

  return {
    handleBulkOperation,
    spinning,
    selectedRowKeys,
    isSelectAll,
    searchParams,
    setSpinning,
    setSelectedRowKeys,
    setIsSelectAll,
    setSearchParams,
    handleSelectChange,
    handleSearch,
    handleReset,
  }
}

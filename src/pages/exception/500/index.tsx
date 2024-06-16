import { Button, Result } from 'antd'

export default function Page500() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={(
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      )}
    />
  )
}

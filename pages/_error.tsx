import { NextPage } from 'next';
import OffLineWidget from '@/components/widgets/OfflineWidget';

const Error: NextPage = ({ statusCode, message = `` }: any) => {
    console.log({statusCode})
  return (
      <OffLineWidget
        message={
          statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'
        }
      />
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;

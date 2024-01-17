import { Bars } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#281cc9"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

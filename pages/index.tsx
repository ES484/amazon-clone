import Header from '@/components/Home/Header';
import Banner from '@/components/Home/Banner';
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import Products from '@/components/Home/Product';
import { Product } from '@/types/index';

type Props = {
 products: Product[]
}
const Home: NextPage<Props> = ({ products }): JSX.Element => {
  const router = useRouter();
  return (
    <>
    <Header/>
    <Banner />
    <Products products= {products} />
    </>
  )
}

export default Home;

export async function getServerSideProps (context: any) {
  const products = await fetch(`https://fakestoreapi.com/products/`)
  .then((res) => res.json());
  
  return {
      props: {
          products
      }
  }
}

